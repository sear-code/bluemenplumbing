# Quotes Database Setup Guide

This guide will help you set up the database integration to save customer quotes and information.

## What Was Implemented

✅ **Database Schema**: Added `quotes` table to Supabase
✅ **TypeScript Types**: Updated type definitions for the quotes table
✅ **API Route**: Created `/api/quotes` endpoint for submitting and retrieving quotes
✅ **Service Integration**: Connected the quote form to the real API

## Setup Instructions

### 1. Update Your Supabase Schema

Run the updated schema file in your Supabase SQL Editor:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open and run the contents of `supabase-schema.sql`
4. This will create the `quotes` table with all necessary fields

### 2. Verify Environment Variables

Make sure your `.env.local` file has the Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these from: https://app.supabase.com/project/_/settings/api

### 3. Database Schema Details

The `quotes` table includes:

**Customer Information:**
- `first_name`, `last_name`
- `email`, `phone`

**Property Information:**
- `property_type` (house, apartment, commercial, etc.)
- `address_street`, `address_city`, `address_state`, `address_zip`

**Service Details:**
- `selected_services` (JSONB array of service IDs)
- `selected_categories` (JSONB array of category IDs)
- `custom_service` (text description for custom requests)
- `problem_description` (detailed description of the issue)
- `urgency` (standard, urgent, emergency)

**Quote Details:**
- `quote_id` (unique identifier like BMP-1234567890)
- `estimated_price` (calculated estimate)
- `estimated_duration` (time to complete in minutes)
- `status` (submitted, contacted, approved, completed, cancelled)

**Additional Info:**
- `access_notes` (special access instructions)
- `preferred_datetime` (when customer wants service)
- `photos` (JSONB array of photo URLs)

### 4. How It Works

#### When a Customer Submits a Quote:

1. **Form Validation**: The form validates all required fields
2. **API Call**: Data is sent to `/api/quotes` endpoint
3. **Database Insert**: Quote is saved to Supabase `quotes` table
4. **Response**: Customer receives confirmation with quote ID
5. **Email Record**: Customer email is stored for follow-up

#### Data Flow:

```
Quote Form → useQuoteForm Hook → quoteService.ts → /api/quotes → Supabase
```

### 5. Retrieving Quotes

The API supports GET requests to retrieve quotes:

**Get All Quotes:**
```bash
GET /api/quotes
```

**Filter by Email:**
```bash
GET /api/quotes?email=customer@example.com
```

**Filter by Quote ID:**
```bash
GET /api/quotes?quoteId=BMP-1234567890
```

**Filter by Status:**
```bash
GET /api/quotes?status=submitted
```

### 6. Testing

To test the integration:

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Submit a test quote** through your website

3. **Check Supabase** to verify the data was saved:
   - Go to **Table Editor** in Supabase
   - Select the `quotes` table
   - You should see your test quote

4. **Test the API** directly:
   ```bash
   # In your browser or Postman
   http://localhost:3000/api/quotes
   ```

### 7. Security (Row Level Security)

The quotes table has RLS policies:

- ✅ **Public INSERT**: Anyone can submit quotes (for the public form)
- ✅ **Authenticated READ/UPDATE/DELETE**: Only authenticated users (admin) can view/modify quotes
- ✅ **Service Role**: Full access for backend operations

### 8. Next Steps (Optional Enhancements)

Consider adding:

1. **Email Notifications**: Send confirmation emails to customers
2. **Admin Dashboard**: View and manage quotes in an admin panel
3. **Telegram Notifications**: Get instant alerts for new quotes
4. **Photo Upload**: Implement real photo upload to Supabase Storage
5. **Quote Status Tracking**: Allow customers to check their quote status

## Troubleshooting

### Issue: "Missing Supabase environment variables"

**Solution**: Make sure `.env.local` has both:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Issue: "Database error: permission denied"

**Solution**: 
1. Check that RLS policies are set up correctly
2. Verify the schema was created successfully
3. Check Supabase logs for detailed error messages

### Issue: Quote submission fails silently

**Solution**:
1. Open browser console to see errors
2. Check the API response in Network tab
3. Verify Supabase connection is working

## Database Migration from Old System

If you had quotes stored elsewhere, you can migrate them:

```sql
-- Example migration query
INSERT INTO quotes (
  quote_id, first_name, last_name, email, phone,
  selected_services, status, created_at
)
SELECT 
  old_quote_id, first_name, last_name, email, phone,
  services::jsonb, 'submitted', created_date
FROM old_quotes_table;
```

## Support

If you encounter issues:
1. Check Supabase logs in the dashboard
2. Review browser console for client-side errors
3. Check server logs for API errors
4. Verify all environment variables are set correctly

---

**Status**: ✅ Fully Implemented and Ready to Use

**Last Updated**: February 9, 2026
