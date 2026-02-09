# 🎯 Supabase Setup Instructions
**Blue Men Plumbing - Database Setup**

---

## 📦 What's Included

You now have everything you need to set up Supabase:

### Setup Files:
1. **`supabase-schema.sql`** - Creates database tables and security policies
2. **`supabase-initial-data.sql`** - Populates tables with all 30 services
3. **`test-supabase.mjs`** - Tests your connection after setup

### Documentation:
1. **`SUPABASE_QUICKSTART.md`** - Fast 5-minute setup
2. **`SUPABASE_SETUP_NEW.md`** - Complete detailed guide with troubleshooting
3. **`SETUP_INSTRUCTIONS.md`** - This file!

---

## 🚀 Getting Started

### Choose Your Path:

**→ Quick Setup (5 minutes)**  
Follow: `SUPABASE_QUICKSTART.md`

**→ Detailed Setup (10 minutes)**  
Follow: `SUPABASE_SETUP_NEW.md`

Both guides will walk you through:
1. Creating a Supabase project
2. Running the SQL scripts
3. Configuring environment variables
4. Testing the connection

---

## 📝 Step-by-Step Overview

### 1. Create Supabase Project
- Go to https://supabase.com/dashboard
- Create new project named "bluemenplumbing"
- Wait for setup to complete (~2 min)

### 2. Run SQL Scripts
Open SQL Editor in Supabase and run in order:
```
1. supabase-schema.sql      (creates tables)
2. supabase-initial-data.sql (adds services)
```

### 3. Configure Environment
Create `.env.local` file:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

### 4. Test Connection
```bash
node test-supabase.mjs
```

### 5. Start Development Server
```bash
npm run dev
```

---

## ✅ Verification Checklist

After setup, verify:
- [ ] SQL scripts ran without errors
- [ ] `.env.local` file exists with correct values
- [ ] Test script shows: "✅ SUCCESS! Supabase is connected"
- [ ] Dev server starts without errors
- [ ] Quote form loads and shows services
- [ ] No console errors in browser

---

## 🎓 What You'll Have

**Database Tables:**
- `service_categories` - 5 main service categories
- `service_items` - 30 individual services

**Service Categories:**
1. Bathroom Rough-In (12 items)
2. Bathroom Finishing (9 items)
3. Kitchen Plumbing (3 items)
4. Laundry Connections (2 items)
5. Repairs & Troubleshooting (4 items)

**Features:**
- ✅ Dynamic service management
- ✅ Real-time price updates
- ✅ Add/edit services without code changes
- ✅ Secure with Row Level Security
- ✅ Free forever (Supabase free tier)

---

## 🔧 Testing Your Setup

### Run the Test Script:
```bash
node test-supabase.mjs
```

**Expected Output:**
```
🔍 Testing Supabase Connection...

📋 Configuration Check:
  ✅ URL is set: https://xxxxx.supabase.co
  ✅ Anon Key is set: eyJhbGc...

🔌 Testing database connection...

✅ service_categories: 5 categories found
✅ service_items: 30 items found

📊 Database Summary:
  Total Categories: 5
  Active Categories: 5
  Total Items: 30
  Active Items: 30

✅ SUCCESS! Supabase is connected and working!
```

---

## 📚 Managing Your Services

### Via Supabase Dashboard:
1. Go to Table Editor
2. Select `service_categories` or `service_items`
3. Edit directly in the UI
4. Changes reflect immediately

### Via SQL Editor:

**Update a price:**
```sql
UPDATE service_items 
SET unit_price = 150 
WHERE id = 'finish-toilet-install';
```

**Add a new service:**
```sql
INSERT INTO service_items (
  id, category_id, name, unit_price, display_order
) VALUES (
  'new-service',
  'bathroom-finishing',
  'New Service Name',
  125,
  10
);
```

**Hide a service:**
```sql
UPDATE service_items 
SET is_active = false 
WHERE id = 'service-to-hide';
```

---

## ⚠️ Common Issues & Solutions

### Issue: "Missing Supabase environment variables"
**Solution:** 
- Check `.env.local` exists in project root
- Verify it has both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart dev server

### Issue: "Services not loading"
**Solutions:**
1. Run test script: `node test-supabase.mjs`
2. Check browser console for errors (F12)
3. Verify credentials in Supabase Dashboard → Settings → API
4. Ensure dev server was restarted after adding env vars

### Issue: "fetch failed" or network error
**Solutions:**
1. Check if Supabase project is active (not paused)
2. Verify URL in `.env.local` matches Dashboard
3. Check your internet connection
4. Try accessing Supabase Dashboard to confirm it's online

### Issue: "No rows returned" after running SQL
**Solution:**
- This is expected for schema.sql (creates tables)
- data.sql should show row counts
- Verify in Table Editor that tables have data

---

## 🎯 Next Steps After Setup

1. **Test the quote generator** - Make sure services load
2. **Try editing a service** - Change a price in Supabase Dashboard
3. **Build admin UI** (optional) - Create a management interface
4. **Set up authentication** (optional) - Secure admin operations
5. **Monitor usage** - Check Supabase Dashboard → Database → Usage

---

## 📖 Additional Documentation

- **`SUPABASE_SETUP.md`** - Original detailed documentation
- **`SUPABASE_ARCHITECTURE.md`** - Database structure details
- **`README_SERVICES_MANAGEMENT.md`** - Service management guide

---

## 💡 Pro Tips

1. **Bookmark your Supabase dashboard** - You'll use it often
2. **Keep your password safe** - Store database password securely
3. **Test before production** - Always test changes in development first
4. **Backup your data** - Export data before major changes
5. **Monitor logs** - Check Supabase logs for errors

---

## 🎉 Success!

Once setup is complete:
- Services load dynamically from database
- You can manage services without touching code
- Changes appear instantly (after page refresh)
- Your website is ready for production!

---

## 📞 Need Help?

1. Check **SUPABASE_SETUP_NEW.md** troubleshooting section
2. Run `node test-supabase.mjs` for diagnostics
3. Check Supabase Dashboard → Logs for errors
4. Review browser console for client-side issues

---

**Ready? Start with `SUPABASE_QUICKSTART.md` or `SUPABASE_SETUP_NEW.md`!** 🚀



