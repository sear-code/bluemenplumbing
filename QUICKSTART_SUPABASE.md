# Supabase Integration - Quick Start Guide

## ✅ What Has Been Set Up

Your Blue Men Plumbing website is now connected to a Supabase database for dynamic service management!

### Database Created
- **Project**: bluemenplumbing
- **Region**: Canada Central (ca-central-1)
- **Status**: Active and Ready
- **URL**: https://elqkduzhcjsgsoksastu.supabase.co

### Data Migrated
All your services have been migrated to the database:
- ✅ 5 Service Categories
- ✅ 30 Service Items
- ✅ All pricing and descriptions

## 🚀 Getting Started (2 Steps)

### Step 1: Add Environment Variables

Create a `.env.local` file in your project root with these values:

```bash
# Copy these EXACT values:
NEXT_PUBLIC_SUPABASE_URL=https://elqkduzhcjsgsoksastu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVscWtkdXpoY2pzZ3Nva3Nhc3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3NzUwMjcsImV4cCI6MjA4MzM1MTAyN30.c7p4OIcerriPBg7Ca0LUOzuvLHwV9D4OuGEi5vbmw9c
```

### Step 2: Restart Your Development Server

```bash
# Stop your current server (Ctrl+C)
# Then restart:
npm run dev
```

## ✨ It's Working!

Open your website and click **"Request Free Quote"**. The services are now loaded from your Supabase database!

## 🎯 Quick Tasks You Can Do Now

### 1. View Your Database
1. Go to: https://supabase.com/dashboard
2. Find project: **bluemenplumbing**
3. Click **Table Editor** → **service_categories**

### 2. Edit a Price (Example)
```sql
-- Go to SQL Editor and run:
UPDATE service_items 
SET unit_price = 275 
WHERE id = 'rough-shower-diverter-basic';
```

Refresh your website → The new price appears instantly!

### 3. Add a New Service
```sql
INSERT INTO service_items (
  id, category_id, name, unit_price, 
  parts_extra, estimated_duration, display_order
) VALUES (
  'kitchen-garbage-disposal',
  'kitchen-plumbing',
  'Garbage Disposal Installation',
  175, false, 90, 4
);
```

### 4. Hide a Service (Without Deleting)
```sql
UPDATE service_items 
SET is_active = false 
WHERE id = 'service-to-hide';
```

## 📊 What Changed in Your Code

### New Files Created
- `/src/lib/supabase.ts` - Database client
- `/src/services/supabaseServiceApi.ts` - Service fetching logic
- `/app/api/services/route.ts` - API endpoint for services
- `/app/api/admin/services/categories/route.ts` - Admin API for categories
- `/app/api/admin/services/items/route.ts` - Admin API for items

### Modified Files
- `/src/components/forms/ServiceSelectorTwoTier.tsx` - Now fetches from API
- `package.json` - Added @supabase/supabase-js

### No Breaking Changes
- All existing functionality still works
- Old service files kept as backup
- Same user experience, but dynamic

## 🔐 Security Notes

- ✅ Row Level Security (RLS) is enabled
- ✅ Public users can only READ services
- ✅ Modifications require authentication
- ⚠️ Admin routes currently open (add auth for production)

## 📖 Full Documentation

See `SUPABASE_SETUP.md` for:
- Complete database schema
- All API endpoints
- Advanced management options
- Troubleshooting guide

## 💡 Common Operations

### Change a Category Name
```sql
UPDATE service_categories 
SET name = 'New Name' 
WHERE id = 'category-id';
```

### Update Price Range
```sql
UPDATE service_categories 
SET price_range_min = 100, price_range_max = 2500 
WHERE id = 'bathroom-rough-in';
```

### Add Description to Service
```sql
UPDATE service_items 
SET description = 'Includes labor and standard fixtures' 
WHERE id = 'finish-shower-fixture';
```

### Reorder Services
```sql
UPDATE service_items 
SET display_order = 1 
WHERE id = 'make-this-first';
```

## 🎨 Future Enhancements

You can build:
1. Admin dashboard for managing services (UI)
2. Import/export services functionality
3. Price history tracking
4. Service analytics
5. Seasonal pricing rules

## ❓ Need Help?

**Services not loading?**
- Check `.env.local` is created and saved
- Restart dev server after adding env variables
- Check browser console for errors

**Still stuck?**
- Review logs in Supabase Dashboard
- Check Network tab in browser DevTools
- See full documentation in `SUPABASE_SETUP.md`

## 🎉 Success!

You can now manage your services without touching code. Add new services, update prices, or change descriptions anytime from the Supabase dashboard!

---

**Next Steps:**
1. Add the environment variables
2. Restart your server
3. Test the quote generator
4. Try editing a service in Supabase dashboard

