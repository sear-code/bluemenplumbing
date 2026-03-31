import { NextRequest, NextResponse } from 'next/server';
import { QuoteInsert } from '@/lib/supabase';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { quoteSubmissionSchema } from '@/lib/validations/quote';

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

// Create Supabase client with proper error handling
const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Initialize Resend only if API key is provided
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey && resendApiKey !== 'your_api_key_here'
  ? new Resend(resendApiKey)
  : null;

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // 5 submissions per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Check if Supabase is properly configured
    if (!supabase) {
      console.error('Supabase not configured. Please check environment variables.');
      return NextResponse.json(
        {
          success: false,
          error: 'Database not configured. Please contact the administrator.',
        },
        { status: 500 }
      );
    }

    const rawData = await request.json();

    // Validate input
    const parseResult = quoteSubmissionSchema.safeParse(rawData);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const quoteData = parseResult.data;

    // Generate unique quote ID
    const quoteId = `BMP-${Date.now()}`;

    // Prepare data for database insertion
    const quoteInsert: QuoteInsert = {
      quote_id: quoteId,
      first_name: quoteData.customerInfo.firstName,
      last_name: quoteData.customerInfo.lastName,
      email: quoteData.customerInfo.email,
      phone: quoteData.customerInfo.phone,
      property_type: quoteData.propertyType || null,
      address_street: quoteData.address?.street || null,
      address_city: quoteData.address?.city || null,
      address_state: quoteData.address?.state || null,
      address_zip: quoteData.address?.zipCode || null,
      selected_services: quoteData.selectedServices,
      selected_categories: quoteData.selectedCategories,
      custom_service: quoteData.customService || null,
      problem_description: quoteData.problemDescription || null,
      urgency: quoteData.urgency,
      estimated_price: quoteData.estimatedPrice,
      estimated_duration: quoteData.estimatedDuration,
      distance_fee: quoteData.distanceFee ?? null,
      distance_km: quoteData.distanceKm ?? null,
      status: 'submitted',
      access_notes: quoteData.accessNotes || null,
      preferred_datetime: quoteData.preferredDateTime || null,
      photos: quoteData.photos,
    };

    // Insert quote into database
    const { error } = await supabase
      .from('quotes')
      .insert(quoteInsert);

    if (error) {
      console.error('Supabase error:', error);

      if (error.message && error.message.includes('ENOTFOUND')) {
        throw new Error('Unable to connect to database. Please check your internet connection or Supabase configuration.');
      } else if (error.message && error.message.includes('fetch failed')) {
        throw new Error('Database connection failed. The database service may be temporarily unavailable.');
      }

      throw new Error(`Database error: ${error.message}`);
    }

    // Send email notifications (don't fail quote submission if email fails)
    try {
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
      const toEmail = process.env.RESEND_TO_EMAIL;

      if (!resend) {
        console.warn('Resend not configured or API key is invalid. Skipping email notification.');
      } else if (!toEmail) {
        console.warn('RESEND_TO_EMAIL not configured. Skipping email notification.');
      } else {
        const servicesList = quoteData.selectedServices?.length > 0
          ? quoteData.selectedServices.join(', ')
          : quoteData.customService || 'N/A';

        await resend.emails.send({
          from: fromEmail,
          to: toEmail,
          subject: `New Quote Request - ${quoteId}`,
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background-color: #4492AC; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                  .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
                  .info-row { margin: 15px 0; padding: 15px; background-color: white; border-left: 4px solid #4492AC; }
                  .label { font-weight: bold; color: #4492AC; font-size: 14px; }
                  .value { margin-top: 5px; font-size: 16px; }
                  .urgency-high { color: #dc2626; font-weight: bold; }
                  .urgency-standard { color: #059669; font-weight: bold; }
                  .price-highlight { font-size: 24px; color: #4492AC; font-weight: bold; margin-top: 10px; }
                  .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1 style="margin: 0;">New Quote Request</h1>
                    <p style="margin: 5px 0 0 0; font-size: 18px;">${quoteId}</p>
                  </div>
                  <div class="content">
                    <div class="info-row">
                      <div class="label">Services Requested:</div>
                      <div class="value">${servicesList}</div>
                    </div>

                    <div class="info-row">
                      <div class="label">Urgency Level:</div>
                      <div class="value">
                        <span class="${quoteData.urgency === 'emergency' ? 'urgency-high' : 'urgency-standard'}">
                          ${quoteData.urgency === 'emergency' ? 'EMERGENCY' : 'STANDARD'}
                        </span>
                      </div>
                    </div>

                    ${quoteData.problemDescription ? `
                    <div class="info-row">
                      <div class="label">Service Details:</div>
                      <div class="value">${quoteData.problemDescription}</div>
                    </div>
                    ` : ''}

                    <div class="info-row">
                      <div class="label">Estimated Price:</div>
                      <div class="price-highlight">$${quoteData.estimatedPrice || 0}</div>
                    </div>

                    <div class="info-row">
                      <div class="label">Estimated Duration:</div>
                      <div class="value">${quoteData.estimatedDuration || 120} minutes</div>
                    </div>

                    <div class="footer">
                      <p>This is an automated notification from Blue Men Plumbing quote system.</p>
                      <p>View full customer details in your Supabase dashboard using Quote ID: <strong>${quoteId}</strong></p>
                    </div>
                  </div>
                </div>
              </body>
            </html>
          `,
        });

        await resend.emails.send({
          from: fromEmail,
          to: quoteData.customerInfo.email,
          subject: `Quote Request Received - ${quoteId}`,
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background-color: #4492AC; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                  .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
                  .highlight { background-color: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #4492AC; }
                  .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1 style="margin: 0;">Thank You!</h1>
                    <p style="margin: 10px 0 0 0;">Your quote request has been received</p>
                  </div>
                  <div class="content">
                    <p>Hi ${quoteData.customerInfo.firstName},</p>

                    <p>Thank you for choosing Blue Men Plumbing! We've received your quote request and our team will review it shortly.</p>

                    <div class="highlight">
                      <p style="margin: 0;"><strong>Your Quote ID:</strong></p>
                      <p style="font-size: 24px; color: #4492AC; margin: 10px 0;"><strong>${quoteId}</strong></p>
                      <p style="margin: 0;"><strong>Estimated Price:</strong> $${quoteData.estimatedPrice || 0}</p>
                      <p style="margin: 10px 0 0 0;"><strong>Services:</strong> ${servicesList}</p>
                    </div>

                    <h3 style="color: #4492AC;">What happens next?</h3>
                    <ul>
                      <li>Our team will review your request within 24 hours</li>
                      <li>We'll contact you using the information you provided</li>
                      <li>We'll schedule a convenient time for service</li>
                    </ul>

                    <p>If you have any questions or need to make changes to your request, please don't hesitate to contact us.</p>

                    <p style="margin-top: 30px;">Best regards,<br>
                    <strong>The Blue Men Plumbing Team</strong></p>

                    <div class="footer">
                      <p>This is an automated confirmation email.</p>
                      <p>&copy; ${new Date().getFullYear()} Blue Men Plumbing. All rights reserved.</p>
                    </div>
                  </div>
                </div>
              </body>
            </html>
          `,
        });

        console.log(`Email notifications sent successfully for quote ${quoteId}`);
      }
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
    }

    // Prepare response
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 30);

    const responseData = {
      quoteId,
      estimatedPrice: quoteData.estimatedPrice,
      estimatedDuration: quoteData.estimatedDuration,
      validUntil,
      message: 'Your quote request has been received. We will contact you within 24 hours.',
    };

    return NextResponse.json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error('Quote submission error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit quote',
      },
      { status: 500 }
    );
  }
}

// GET endpoint for admin use only (protected by middleware)
export async function GET(request: NextRequest) {
  try {
    // Admin auth is enforced by middleware.ts for /api/admin/* routes.
    // This endpoint is at /api/quotes which is NOT under /api/admin,
    // so we verify the admin token here explicitly.
    const adminSecret = process.env.ADMIN_API_SECRET;
    const authHeader = request.headers.get('authorization');
    if (
      !adminSecret ||
      !authHeader ||
      !authHeader.startsWith('Bearer ') ||
      authHeader.slice(7) !== adminSecret
    ) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!supabase) {
      console.error('Supabase not configured. Please check environment variables.');
      return NextResponse.json(
        {
          success: false,
          error: 'Database not configured. Please contact the administrator.',
        },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const quoteId = searchParams.get('quoteId');
    const status = searchParams.get('status');

    let query = supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false });

    if (email) {
      query = query.eq('email', email);
    }
    if (quoteId) {
      query = query.eq('quote_id', quoteId);
    }
    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);

      if (error.message && error.message.includes('ENOTFOUND')) {
        throw new Error('Unable to connect to database. Please check your internet connection or Supabase configuration.');
      } else if (error.message && error.message.includes('fetch failed')) {
        throw new Error('Database connection failed. The database service may be temporarily unavailable.');
      }

      throw new Error(`Database error: ${error.message}`);
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      count: data?.length || 0,
    });
  } catch (error) {
    console.error('Quote retrieval error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to retrieve quotes',
      },
      { status: 500 }
    );
  }
}
