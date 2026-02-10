# Quote System Setup Guide

## Current Issue

The quote submission system is experiencing errors because the **Resend API key** is not properly configured in your `.env.local` file.

## Error Details

The errors you're seeing (`Database error: TypeError: fetch failed`) occur because:

1. The Resend API key is still set to the placeholder value `your_api_key_here`
2. The system tries to send emails during quote submission
3. When email initialization fails, it can affect the entire request

## Quick Fix (For Testing)

The quote system will now **work without email notifications**. The improved code will:

- ✅ Successfully submit quotes to Supabase
- ✅ Return quote confirmation to users
- ⚠️ Skip email notifications if Resend is not configured
- ✅ Log warnings instead of failing

Just refresh your application and try submitting a quote again. It should work now, but you won't receive email notifications.

## Full Setup (For Production)

To enable email notifications, follow these steps:

### 1. Sign up for Resend

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key

1. Go to [https://resend.com/api-keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Give it a name (e.g., "Blue Men Plumbing - Production")
4. Copy the API key (it starts with `re_`)

### 3. Update Your `.env.local` File

Open your `.env.local` file and update these values:

```bash
# Replace with your actual Resend API key
RESEND_API_KEY=re_your_actual_api_key_here

# For development/testing, you can use Resend's test domain
RESEND_FROM_EMAIL=onboarding@resend.dev

# Your business email where you want to receive quote notifications
RESEND_TO_EMAIL=searahmad22@gmail.com
```

### 4. (Optional) Set Up Custom Domain

For production, you should verify your own domain:

1. Go to [https://resend.com/domains](https://resend.com/domains)
2. Click "Add Domain"
3. Follow the instructions to add DNS records
4. Once verified, update `RESEND_FROM_EMAIL` to use your domain:

```bash
RESEND_FROM_EMAIL=quotes@bluemenplumbing.com
```

### 5. Restart Your Development Server

After updating `.env.local`, restart your Next.js dev server:

```bash
# Stop the current server (Ctrl+C)
# Then start it again
npm run dev
```

## Email Features

Once configured, the system will send:

### 1. Business Owner Notification
- Sent to: `RESEND_TO_EMAIL`
- Contains: Quote ID, services requested, urgency level, estimated price
- **Privacy-focused**: Does NOT include customer contact details in email

### 2. Customer Confirmation
- Sent to: Customer's email
- Contains: Quote ID, services requested, estimated price, next steps
- Professional branded email template

## Testing Email Setup

After configuration, test the system by:

1. Submit a test quote through your website
2. Check your email (`RESEND_TO_EMAIL`) for the business notification
3. Check the customer email for the confirmation
4. Review the Resend dashboard at [https://resend.com/emails](https://resend.com/emails)

## Troubleshooting

### Quote submission still fails
- Check that Supabase credentials are correct in `.env.local`
- Verify your Supabase database has the `quotes` table
- Check browser console for detailed error messages

### Emails not being sent
- Verify your Resend API key is correct
- Check the Resend dashboard for error logs
- Ensure `RESEND_TO_EMAIL` is a valid email address
- For custom domains, verify DNS records are properly configured

### "Supabase not configured" error
- Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Verify credentials at [https://app.supabase.com/project/_/settings/api](https://app.supabase.com/project/_/settings/api)

## Current Configuration Status

Your `.env.local` currently has:

- ✅ Supabase URL: Configured
- ✅ Supabase Anon Key: Configured
- ❌ Resend API Key: **Needs configuration** (currently using placeholder)
- ✅ Resend From Email: Configured
- ✅ Resend To Email: Configured

## Support

If you continue experiencing issues:

1. Check the browser console for detailed error messages
2. Check your terminal/server logs
3. Verify all environment variables are properly set
4. Ensure you've restarted the dev server after changes

## Code Changes Made

The following improvements were made to handle configuration issues gracefully:

1. **Better error handling** in `src/services/quoteService.ts`
   - Checks response status before parsing JSON
   - Provides detailed error messages
   - Detects network connection issues

2. **Graceful degradation** in `app/api/quotes/route.ts`
   - Validates environment variables on startup
   - Returns clear error messages if database is not configured
   - Skips email sending if Resend is not configured (with warnings)
   - Quote submission still works even if emails fail

3. **Improved user experience**
   - Users see helpful error messages instead of generic "fetch failed"
   - System continues to work even with partial configuration
   - Administrators can see detailed logs for troubleshooting
