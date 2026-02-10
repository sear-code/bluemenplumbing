# Email Notifications Setup Guide

## ✅ What's Been Done

1. ✅ Installed Resend package
2. ✅ Updated API route to send emails
3. ✅ Added email templates for both business and customer notifications
4. ✅ Updated `.env.local.example` with required variables

## 🚀 Next Steps (Required)

### Step 1: Sign Up for Resend

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (3,000 emails/month free)
3. Verify your email address

### Step 2: Get Your API Key

1. Log into your Resend dashboard
2. Navigate to **API Keys** section
3. Click **Create API Key**
4. Name it something like "Blue Men Plumbing Production"
5. Copy the API key (starts with `re_`)

### Step 3: Update Your `.env.local` File

Add these three lines to your `.env.local` file:

```bash
RESEND_API_KEY=re_your_actual_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev
RESEND_TO_EMAIL=your-actual-email@example.com
```

**Important Notes:**
- Replace `RESEND_TO_EMAIL` with YOUR email address (where you want to receive quote notifications)
- For testing, you can use `onboarding@resend.dev` as the FROM email
- For production, you'll want to verify your own domain (see Step 5 below)

### Step 4: Test It Out

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to your quote form on the website
3. Submit a test quote
4. Check your email inbox (the one you set in `RESEND_TO_EMAIL`)

You should receive:
- ✉️ A notification email with all quote details (to your business email)
- ✉️ A confirmation email sent to the customer

### Step 5: Production Setup (Optional but Recommended)

For production, you should use your own domain instead of `onboarding@resend.dev`:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `bluemenplumbing.com`)
4. Add the DNS records Resend provides to your domain registrar
5. Wait for verification (usually 5-15 minutes)
6. Update `RESEND_FROM_EMAIL` in `.env.local`:
   ```bash
   RESEND_FROM_EMAIL=quotes@bluemenplumbing.com
   ```

**Benefits of using your own domain:**
- Better deliverability
- Professional appearance
- Brand consistency
- No "via resend.dev" label

## 📧 Email Features

### Business Notification Email Includes:
- Quote ID
- Customer contact information
- Property details
- Services requested
- Urgency level (highlighted if emergency)
- Problem description
- Estimated price and duration
- Access notes
- Preferred date/time
- Photo count (if any)

### Customer Confirmation Email Includes:
- Quote ID for reference
- Estimated price
- Services requested
- What happens next (timeline)
- Your contact information

## 🔒 Security Notes

- Your `RESEND_API_KEY` should **NEVER** be committed to Git
- The `.env.local` file is already in `.gitignore`
- Only server-side code can access this key (it's not exposed to the browser)
- Email sending errors won't prevent quote submissions (fail gracefully)

## 🛠️ Troubleshooting

### Emails Not Sending?

1. **Check your `.env.local` file**
   - Make sure all three variables are set
   - No extra spaces or quotes
   - API key starts with `re_`

2. **Check the server console**
   - Look for email-related errors
   - Should see: "Email notifications sent successfully for quote BMP-xxxxx"

3. **Check Resend dashboard**
   - Go to **Logs** section
   - See if emails are being sent
   - Check for any delivery issues

4. **Check spam folder**
   - Test emails might go to spam
   - Mark as "Not Spam" to improve future deliverability

### Common Issues

**"RESEND_API_KEY not configured"**
- Add the API key to your `.env.local` file
- Restart your dev server after adding it

**"RESEND_TO_EMAIL not configured"**
- Add your business email to `.env.local`
- This is where you'll receive notifications

**"Authentication failed"**
- Double-check your API key is correct
- Make sure there are no extra spaces
- Try generating a new API key

## 📊 Free Tier Limits

Resend's free tier includes:
- 3,000 emails per month
- 100 emails per day
- Unlimited domains
- Email analytics
- API access

This should be more than enough for quote notifications. If you need more, paid plans start at $20/month for 50,000 emails.

## 🎨 Customization

Want to customize the email templates? Edit the HTML in:
```
app/api/quotes/route.ts
```

Look for the `resend.emails.send()` calls and modify the `html` property.

## 📝 Testing Checklist

- [ ] Signed up for Resend account
- [ ] Got API key
- [ ] Added all three env variables to `.env.local`
- [ ] Restarted dev server
- [ ] Submitted test quote
- [ ] Received business notification email
- [ ] Received customer confirmation email
- [ ] Emails look good on desktop
- [ ] Emails look good on mobile

## 🚀 Ready for Production?

Before going live:
1. ✅ Verify your domain in Resend
2. ✅ Update `RESEND_FROM_EMAIL` to use your domain
3. ✅ Test thoroughly
4. ✅ Check spam score (Resend provides this)
5. ✅ Set up email monitoring/alerts

---

**Need Help?** Check the [Resend Documentation](https://resend.com/docs) or feel free to ask!
