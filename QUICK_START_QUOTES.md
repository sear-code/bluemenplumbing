# 🚀 Quick Start - Quotes Database (5 Minutes)

Get your quote system saving to the database in 3 simple steps!

## Step 1: Run SQL Script (2 minutes)

### If you already have Supabase set up:
1. Open Supabase Dashboard: https://app.supabase.com
2. Go to **SQL Editor**
3. Copy the contents of `add-quotes-table.sql`
4. Paste and click **Run**

### If this is your first time with Supabase:
1. Create account at https://supabase.com
2. Click "New Project"
3. Go to **SQL Editor**
4. Copy the contents of `supabase-schema.sql`
5. Paste and click **Run**

## Step 2: Get Your Credentials (2 minutes)

1. In Supabase Dashboard, go to **Settings** → **API**
2. Copy two values:
   - **Project URL** (looks like: https://xxxxxxxxxxxxx.supabase.co)
   - **anon/public key** (long string starting with `eyJ...`)

## Step 3: Configure Environment (1 minute)

1. Create/edit `.env.local` in your project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=paste_your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_anon_key_here
```

2. Start your server:
```bash
npm run dev
```

## Test It! (30 seconds)

1. Go to http://localhost:3000
2. Fill out and submit a quote
3. Check Supabase → **Table Editor** → `quotes` table
4. You should see your quote! 🎉

---

## That's It!

Your quotes are now being saved to the database. Every customer who submits a quote will have their information stored in Supabase.

### What You Get:
✅ Customer contact information
✅ Service selections and details
✅ Property information
✅ Quote estimates
✅ Timestamps
✅ Unique quote IDs

### Next Steps (Optional):
- Review `IMPLEMENTATION_COMPLETE.md` for full details
- Use `TESTING_CHECKLIST.md` for thorough testing
- Add Telegram notifications (ask me how!)

---

**Need help?** See `QUOTES_DATABASE_SETUP.md` for detailed instructions and troubleshooting.
