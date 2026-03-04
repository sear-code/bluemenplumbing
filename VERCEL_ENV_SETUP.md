# Vercel Environment Variables Setup

Your build is failing because Supabase environment variables are missing in Vercel. Here are **3 ways** to fix this:

---

## Option 1: Using the Automated Script (Recommended)

Run this command in your terminal:

```bash
cd /Users/searahmad/Documents/GitHub/bluemenplumbing
./setup-vercel-env-v2.sh
```

The script will:
1. Check if Vercel CLI is installed
2. Prompt you to login if needed
3. Add all required environment variables automatically
4. Guide you to redeploy

---

## Option 2: Using Vercel CLI Manually

1. **Login to Vercel:**
   ```bash
   vercel login
   ```

2. **Add each variable:**
   ```bash
   cd /Users/searahmad/Documents/GitHub/bluemenplumbing
   
   # Supabase URL
   echo "https://elqkduzhcjsgsoksastu.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL production preview development
   
   # Supabase Anon Key
   echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVscWtkdXpoY2pzZ3Nva3Nhc3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3NzUwMjcsImV4cCI6MjA4MzM1MTAyN30.c7p4OIcerriPBg7Ca0LUOzuvLHwV9D4OuGEi5vbmw9c" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production preview development
   
   # Resend API Key
   echo "re_HPs1rq82_HJNUrQyXLzfbHEiEGgrFNsh3" | vercel env add RESEND_API_KEY production preview development
   
   # Resend From Email
   echo "onboarding@resend.dev" | vercel env add RESEND_FROM_EMAIL production preview development
   
   # Resend To Email
   echo "searahmad22@gmail.com" | vercel env add RESEND_TO_EMAIL production preview development
   ```

3. **Redeploy:**
   ```bash
   vercel --prod
   ```

---

## Option 3: Using Vercel Dashboard (Manual)

1. **Go to your project settings:**
   https://vercel.com/sear-codes-projects/bluemenplumbing/settings/environment-variables

2. **Add these variables one by one:**

   ### Supabase Variables

   **Name:** `NEXT_PUBLIC_SUPABASE_URL`  
   **Value:** `https://elqkduzhcjsgsoksastu.supabase.co`  
   **Environments:** ✓ Production ✓ Preview ✓ Development

   **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
   **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVscWtkdXpoY2pzZ3Nva3Nhc3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3NzUwMjcsImV4cCI6MjA4MzM1MTAyN30.c7p4OIcerriPBg7Ca0LUOzuvLHwV9D4OuGEi5vbmw9c`  
   **Environments:** ✓ Production ✓ Preview ✓ Development

   ### Resend Variables

   **Name:** `RESEND_API_KEY`  
   **Value:** `re_HPs1rq82_HJNUrQyXLzfbHEiEGgrFNsh3`  
   **Environments:** ✓ Production ✓ Preview ✓ Development

   **Name:** `RESEND_FROM_EMAIL`  
   **Value:** `onboarding@resend.dev`  
   **Environments:** ✓ Production ✓ Preview ✓ Development

   **Name:** `RESEND_TO_EMAIL`  
   **Value:** `searahmad22@gmail.com`  
   **Environments:** ✓ Production ✓ Preview ✓ Development

3. **Redeploy your project:**
   - Go to Deployments tab
   - Click "Redeploy" on the latest deployment
   - Or push a new commit to trigger automatic deployment

---

## Verification

After adding the variables and redeploying, your build should complete successfully. You can verify by:

1. Checking the deployment logs in Vercel dashboard
2. Visiting your live site
3. Testing the Supabase connection

---

## Troubleshooting

If you still get errors:

1. **Check variable names** - They must match exactly (case-sensitive)
2. **Check all environments** - Make sure all three (Production, Preview, Development) are selected
3. **Wait for redeploy** - Changes only take effect after a new deployment
4. **Clear cache** - Sometimes you need to clear the build cache in Vercel settings

---

## Next Steps

- **Optional:** Add Google Places API variables if you're using the reviews feature
- **Security:** Consider rotating your Supabase anon key if it's been exposed
- **Monitoring:** Set up Vercel deployment notifications to catch future build errors

---

## Quick Links

- **Project Dashboard:** https://vercel.com/sear-codes-projects/bluemenplumbing
- **Environment Variables:** https://vercel.com/sear-codes-projects/bluemenplumbing/settings/environment-variables
- **Deployments:** https://vercel.com/sear-codes-projects/bluemenplumbing/deployments
