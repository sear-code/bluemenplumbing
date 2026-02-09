# 🚀 Supabase Setup Guide - Blue Men Plumbing
**Complete Step-by-Step Instructions**

## Overview
This guide will help you set up a new Supabase database for your Blue Men Plumbing website. The database will store all your services, allowing you to manage them without touching the code.

**Time Required:** ~10 minutes

---

## Step 1: Create a New Supabase Project

### 1.1 Go to Supabase Dashboard
Visit: https://supabase.com/dashboard

### 1.2 Sign In or Create Account
- If you don't have an account, click "Sign Up" and create one
- If you already have an account, sign in

### 1.3 Create New Project
1. Click **"New Project"** button
2. Fill in the project details:
   - **Name:** `bluemenplumbing` (or any name you prefer)
   - **Database Password:** Create a strong password and **SAVE IT**
   - **Region:** Select closest to you (e.g., "Canada (Central)" or "US East")
   - **Pricing Plan:** Select "Free" (sufficient for this project)
3. Click **"Create new project"**
4. Wait 2-3 minutes for the project to be created

---

## Step 2: Set Up Database Schema

### 2.1 Open SQL Editor
1. In your Supabase dashboard, find the **left sidebar**
2. Click on **"SQL Editor"**

### 2.2 Run Schema Script
1. Click **"New Query"** button
2. **Copy the entire contents** of `supabase-schema.sql` file
3. **Paste** it into the SQL editor
4. Click **"Run"** button (or press Cmd/Ctrl + Enter)
5. You should see: ✅ "Success. No rows returned"

**What this does:**
- Creates `service_categories` table
- Creates `service_items` table
- Sets up Row Level Security (RLS) policies
- Creates indexes for performance

---

## Step 3: Populate Database with Service Data

### 3.1 Create Another New Query
1. Still in SQL Editor, click **"New Query"** again
2. **Copy the entire contents** of `supabase-initial-data.sql` file
3. **Paste** it into the SQL editor
4. Click **"Run"** button

### 3.2 Verify Data Import
You should see a success message like:
```
✅ Data imported successfully!
-----------------------------------
Service Categories: 5
Service Items: 30
```

### 3.3 View Your Data (Optional)
1. Click **"Table Editor"** in the left sidebar
2. Click on **"service_categories"** - you should see 5 rows
3. Click on **"service_items"** - you should see 30 rows

---

## Step 4: Get Your API Credentials

### 4.1 Go to Project Settings
1. Click the **⚙️ Settings** icon in the left sidebar
2. Click **"API"** in the settings menu

### 4.2 Copy Your Credentials
You'll need two values:

**1. Project URL:**
- Look for "Project URL" section
- Copy the URL (looks like: `https://xxxxx.supabase.co`)

**2. Anon/Public Key:**
- Scroll down to "Project API keys" section
- Find the **"anon" / "public"** key
- Click the copy icon to copy it

**⚠️ Important:** Keep these values safe! Don't share them publicly.

---

## Step 5: Update Environment Variables

### 5.1 Create/Edit .env.local File
1. Open your project in your code editor
2. In the **root directory**, create or open `.env.local` file
3. Add these lines (replace with YOUR values):

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Keep any existing environment variables below
# (Google Reviews, etc.)
```

### 5.2 Save the File
- Make sure to **save** the `.env.local` file
- This file is ignored by git (for security)

---

## Step 6: Test the Connection

### 6.1 Restart Development Server
If your dev server is running:
```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### 6.2 Test in Browser
1. Open your website (usually http://localhost:3000)
2. Click **"Request Free Quote"** button
3. You should see the service selector load with all categories
4. Try selecting different categories - items should appear

### 6.3 Check Browser Console
1. Open browser DevTools (F12 or Right-click → Inspect)
2. Go to **Console** tab
3. Look for any errors (there shouldn't be any!)

---

## Step 7: Verify Everything is Working

### Test Checklist:
- ✅ Quote form loads without errors
- ✅ Service categories appear (5 categories)
- ✅ Service items load when selecting a category
- ✅ Prices display correctly
- ✅ No console errors

---

## 🎉 Success! What's Next?

### Now You Can:

**1. Manage Services from Supabase Dashboard:**
- Go to Table Editor → service_categories or service_items
- Edit prices, names, descriptions directly
- Changes appear instantly on your website (after refresh)

**2. Add New Services via SQL:**
```sql
-- Example: Add a new service item
INSERT INTO service_items (
  id, category_id, name, unit_price, 
  estimated_duration, display_order
) VALUES (
  'new-service-id',
  'bathroom-finishing',
  'New Service Name',
  150,
  60,
  10
);
```

**3. Update Prices:**
```sql
UPDATE service_items 
SET unit_price = 125 
WHERE id = 'finish-toilet-install';
```

**4. Temporarily Hide a Service:**
```sql
UPDATE service_items 
SET is_active = false 
WHERE id = 'service-to-hide';
```

---

## 🔧 Troubleshooting

### Services Not Loading?

**Check 1: Environment Variables**
```bash
# Make sure .env.local exists and has correct values
cat .env.local
```

**Check 2: Server Restart**
- Stop and restart your dev server after changing .env.local

**Check 3: Browser Console**
- Open DevTools → Console tab
- Look for error messages

**Check 4: Network Tab**
- DevTools → Network tab
- Look for failed requests to `/api/services`

### Database Connection Errors?

**Verify Credentials:**
1. Go to Supabase Dashboard → Settings → API
2. Confirm your URL and API key match `.env.local`

**Check Project Status:**
1. Make sure your Supabase project is active
2. Free tier projects pause after 1 week of inactivity
3. You can restore paused projects from the dashboard

### Still Having Issues?

1. **Check Supabase Logs:**
   - Dashboard → Logs → View recent errors

2. **Test Direct API Call:**
   - Visit: `YOUR_SUPABASE_URL/rest/v1/service_categories?apikey=YOUR_ANON_KEY`
   - Should return JSON with your categories

3. **Verify RLS Policies:**
   - Dashboard → Authentication → Policies
   - Ensure read policies are enabled for public access

---

## 📚 Additional Resources

**Files in This Project:**
- `supabase-schema.sql` - Database schema
- `supabase-initial-data.sql` - Initial service data
- `SUPABASE_SETUP.md` - Detailed documentation
- `src/lib/supabase.ts` - Supabase client configuration
- `app/api/services/route.ts` - API endpoint

**Official Documentation:**
- [Supabase Docs](https://supabase.com/docs)
- [Supabase SQL Editor Guide](https://supabase.com/docs/guides/database/overview)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

## 🎓 Quick Reference

### Important URLs:
- **Supabase Dashboard:** https://supabase.com/dashboard
- **Your Project:** (bookmark after creating)

### Important Files:
- **Environment Config:** `.env.local`
- **Database Schema:** `supabase-schema.sql`
- **Initial Data:** `supabase-initial-data.sql`
- **Supabase Client:** `src/lib/supabase.ts`

### Common SQL Operations:

```sql
-- View all categories
SELECT * FROM service_categories;

-- View all items in a category
SELECT * FROM service_items WHERE category_id = 'bathroom-rough-in';

-- Update a price
UPDATE service_items SET unit_price = 150 WHERE id = 'item-id';

-- Add a new item
INSERT INTO service_items (id, category_id, name, unit_price, display_order)
VALUES ('new-id', 'category-id', 'Service Name', 100, 1);

-- Hide/show a service
UPDATE service_items SET is_active = false WHERE id = 'item-id';
UPDATE service_items SET is_active = true WHERE id = 'item-id';
```

---

**Need Help?** Check the troubleshooting section above or review the error messages in your browser console.

**Done!** Your Supabase database is now set up and connected! 🎉



