# ✅ Supabase Setup Checklist

**Print this or keep it open while you set up Supabase**

---

## Pre-Flight Check

- [ ] I have a Supabase account (or will create one)
- [ ] I have these files: `supabase-schema.sql` and `supabase-initial-data.sql`
- [ ] I have ~10 minutes available
- [ ] My internet connection is stable

---

## Step 1: Create Supabase Project

- [ ] Go to https://supabase.com/dashboard
- [ ] Sign in (or create account)
- [ ] Click "New Project"
- [ ] Enter project name: `bluemenplumbing`
- [ ] Create & save database password
- [ ] Select region (closest to you)
- [ ] Click "Create new project"
- [ ] Wait 2-3 minutes for setup

---

## Step 2: Run SQL Scripts

### Schema Script:
- [ ] Click "SQL Editor" in left sidebar
- [ ] Click "New Query"
- [ ] Open `supabase-schema.sql` file
- [ ] Copy all contents
- [ ] Paste into SQL editor
- [ ] Click "Run" (or Cmd/Ctrl + Enter)
- [ ] Verify: See "Success. No rows returned"

### Data Script:
- [ ] Click "New Query" again
- [ ] Open `supabase-initial-data.sql` file
- [ ] Copy all contents
- [ ] Paste into SQL editor
- [ ] Click "Run"
- [ ] Verify: See "Service Categories: 5, Service Items: 30"

---

## Step 3: Get API Credentials

- [ ] Click "Settings" (⚙️) in left sidebar
- [ ] Click "API" in settings menu
- [ ] Copy "Project URL" (save it somewhere)
- [ ] Scroll to "Project API keys"
- [ ] Copy "anon / public" key (save it)

---

## Step 4: Update Environment Variables

- [ ] Open your project in code editor
- [ ] Create/open `.env.local` file in project root
- [ ] Add these lines:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```
- [ ] Replace with YOUR values from Step 3
- [ ] Save the file

---

## Step 5: Test Connection

- [ ] Open terminal in project directory
- [ ] Run: `node test-supabase.mjs`
- [ ] Verify: See "✅ SUCCESS! Supabase is connected"
- [ ] Verify: See "Service Categories: 5"
- [ ] Verify: See "Service Items: 30"

---

## Step 6: Start Development Server

- [ ] Stop dev server if running (Ctrl+C)
- [ ] Run: `npm run dev`
- [ ] Verify: Server starts without errors
- [ ] Open: http://localhost:3000
- [ ] Click: "Request Free Quote" button
- [ ] Verify: Services load and display
- [ ] Open browser DevTools (F12)
- [ ] Check Console tab
- [ ] Verify: No red errors

---

## Final Verification

- [ ] Quote form opens successfully
- [ ] Service categories appear (5 categories)
- [ ] Clicking category shows items
- [ ] Prices display correctly
- [ ] No console errors
- [ ] Can select multiple services
- [ ] Form submission works

---

## Optional: Test Service Management

- [ ] Go back to Supabase Dashboard
- [ ] Click "Table Editor"
- [ ] Select "service_items" table
- [ ] Find any service (e.g., "Toilet Installation")
- [ ] Change the price (e.g., 125 → 150)
- [ ] Click save
- [ ] Go back to your website
- [ ] Refresh the page (Cmd/Ctrl + R)
- [ ] Open quote form
- [ ] Verify: New price appears

---

## 🎉 Success Criteria

✅ All checkboxes above are checked  
✅ Test script shows success  
✅ Services load on website  
✅ No errors in console  
✅ Can edit services in Supabase  
✅ Changes appear on website  

---

## 🚨 Troubleshooting Quick Reference

### Services Not Loading?
1. Check `.env.local` exists and has correct values
2. Restart dev server (Ctrl+C, then `npm run dev`)
3. Check browser console for errors (F12)
4. Run test script: `node test-supabase.mjs`

### Test Script Fails?
1. Verify credentials in Supabase Dashboard → Settings → API
2. Check if project is active (not paused)
3. Ensure both SQL scripts ran successfully
4. Check .env.local format (no extra spaces/quotes)

### SQL Scripts Error?
1. Make sure you're in correct project
2. Run schema.sql before data.sql
3. Check for typos in SQL editor
4. Try running each script one at a time

---

## 📚 Documentation Reference

- **Quick Setup:** `SUPABASE_QUICKSTART.md`
- **Detailed Guide:** `SUPABASE_SETUP_NEW.md`
- **Overview:** `SETUP_INSTRUCTIONS.md`
- **This File:** `SUPABASE_CHECKLIST.md`

---

## 💾 Files You Have

**SQL Files:**
- `supabase-schema.sql` - Database structure
- `supabase-initial-data.sql` - Service data

**Scripts:**
- `test-supabase.mjs` - Connection test

**Documentation:**
- `SUPABASE_QUICKSTART.md` - Fast guide
- `SUPABASE_SETUP_NEW.md` - Detailed guide
- `SETUP_INSTRUCTIONS.md` - Instructions
- `SUPABASE_CHECKLIST.md` - This checklist
- `SUPABASE_READY.md` - Summary

---

## ⏱️ Time Estimate

- Step 1: 3 minutes
- Step 2: 2 minutes
- Step 3: 1 minute
- Step 4: 1 minute
- Step 5: 1 minute
- Step 6: 2 minutes

**Total: ~10 minutes**

---

## 🎯 Next Steps After Setup

1. Test the quote generator thoroughly
2. Try editing services in Supabase Dashboard
3. Familiarize yourself with Table Editor
4. Bookmark your Supabase dashboard
5. Consider adding authentication for admin features

---

**Ready? Start with Step 1!** 🚀

---

**Date Completed:** _______________  
**Project URL:** _______________  
**Notes:** _______________



