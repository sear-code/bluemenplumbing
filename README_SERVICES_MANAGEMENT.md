# Dynamic Services Management - Complete Guide

## 🎯 Overview

Your Blue Men Plumbing website now features **dynamic service management** powered by Supabase. This means you can add, edit, or delete services from your quote generator **without touching any code**.

## ⚡ Quick Start (2 Minutes)

### Prerequisites
The `.env.local` file has already been created with your Supabase credentials.

### Start Your Server
```bash
npm run dev
```

### Test It
1. Open http://localhost:3000
2. Click "Request Free Quote"
3. All services are now loaded from your database! 🎉

## 📖 How to Manage Your Services

### Method 1: Supabase Dashboard (Easiest)

#### Step 1: Login to Supabase
1. Go to https://supabase.com/dashboard
2. Login to your account
3. Select project: **bluemenplumbing**

#### Step 2: Navigate to Tables
1. Click "Table Editor" in the left sidebar
2. You'll see two tables:
   - `service_categories` - Your main service categories
   - `service_items` - Individual services within categories

#### Step 3: Make Changes
Click on any table → Click "Insert row" or edit existing rows → Save

**Changes appear instantly on your website!** (after page refresh)

### Method 2: Using SQL (Advanced)

#### Access SQL Editor
1. In Supabase Dashboard → Click "SQL Editor"
2. Write your SQL → Click "Run"

#### Common Operations

**Add a New Service Category:**
```sql
INSERT INTO service_categories (
  id, 
  name, 
  description, 
  category, 
  price_range_min, 
  price_range_max, 
  estimated_duration, 
  display_order
) VALUES (
  'hvac-services',
  'HVAC Services',
  'Heating, ventilation, and air conditioning',
  'maintenance',
  150,
  800,
  180,
  6
);
```

**Add a New Service Item:**
```sql
INSERT INTO service_items (
  id,
  category_id,
  name,
  description,
  unit_price,
  parts_extra,
  estimated_duration,
  display_order
) VALUES (
  'kitchen-garbage-disposal',
  'kitchen-plumbing',
  'Garbage Disposal Installation',
  'Install and wire new garbage disposal unit',
  175,
  false,
  90,
  4
);
```

**Update a Price:**
```sql
UPDATE service_items 
SET unit_price = 150 
WHERE id = 'rough-shower-diverter-basic';
```

**Update Multiple Prices (Bulk):**
```sql
UPDATE service_items 
SET unit_price = unit_price * 1.1  -- Increase by 10%
WHERE category_id = 'bathroom-rough-in';
```

**Change a Service Name:**
```sql
UPDATE service_items 
SET name = 'Shower Valve Installation (Premium)' 
WHERE id = 'rough-shower-diverter-custom';
```

**Update Category Price Range:**
```sql
UPDATE service_categories 
SET price_range_min = 75, price_range_max = 3500 
WHERE id = 'bathroom-rough-in';
```

**Hide a Service (Soft Delete):**
```sql
UPDATE service_items 
SET is_active = false 
WHERE id = 'service-to-hide';
```

**Show Hidden Service:**
```sql
UPDATE service_items 
SET is_active = true 
WHERE id = 'service-to-show';
```

**Delete Permanently (Not Recommended):**
```sql
DELETE FROM service_items WHERE id = 'service-id';
```

## 🗂️ Database Structure

### service_categories Table

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | TEXT | Unique ID (use kebab-case) | `bathroom-rough-in` |
| `name` | TEXT | Display name | `Bathroom Rough-In` |
| `description` | TEXT | Category description | `Complete plumbing installation...` |
| `category` | TEXT | Type: `rough-in`, `finishing`, `kitchen`, `laundry`, `repair`, `maintenance` | `rough-in` |
| `price_range_min` | INTEGER | Minimum price ($) | `50` |
| `price_range_max` | INTEGER | Maximum price ($) | `3000` |
| `estimated_duration` | INTEGER | Average duration (minutes) | `240` |
| `display_order` | INTEGER | Sort order (lower = first) | `1` |
| `is_active` | BOOLEAN | Show/hide category | `true` |

### service_items Table

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | TEXT | Unique ID (use kebab-case) | `rough-shower-diverter-basic` |
| `category_id` | TEXT | Category it belongs to | `bathroom-rough-in` |
| `name` | TEXT | Display name | `Shower Diverter (Basic)` |
| `description` | TEXT | Optional description | `Parts not included` |
| `unit_price` | INTEGER | Price in dollars | `250` |
| `parts_extra` | BOOLEAN | Are parts extra cost? | `false` |
| `parts_price` | INTEGER | Additional parts cost | `0` |
| `estimated_duration` | INTEGER | Duration in minutes | `90` |
| `display_order` | INTEGER | Sort order within category | `1` |
| `is_active` | BOOLEAN | Show/hide item | `true` |

## 📋 Current Services

### 1. Bathroom Rough-In (12 items)
- Shower Diverter (Basic) - $250
- Shower Diverter (Custom) - $300
- Bath Tub Installation - $400
- Standing Shower Drain - $250
- Free Standing Tub - $250
- Free Standing Shower - $150
- Valve Installation - $50
- Fridge Water Line - $125
- Convert Single Vanity to Double - $200
- Toilet Flange Repair - $95
- 3-Piece Bathroom Rough-In - $1,750
- 3-Piece Bathroom Basement with Permit - $3,000

### 2. Bathroom Finishing (9 items)
- Shower Fixture Installation - $75
- Vanity Complete Plumbing ONLY - $125
- Faucet + P-Trap ONLY - $95
- Vanity Installation + Plumbing - $250
- Toilet Installation - $125
- Free Standing Tub Installation - $85
- Free Standing Shower Installation - $85
- Double Vanity + Plumbing - $450
- Toilet Bidet Installation - $50

### 3. Kitchen Plumbing (3 items)
- Complete Kitchen Plumbing - $150
- Dishwasher Installation - $125
- Dishwasher + Kitchen Plumbing - $250

### 4. Laundry Connections (2 items)
- Washing Machine + Dryer (No Parts) - $85
- Washing Machine + Dryer (With Parts) - $130

### 5. Repairs & Troubleshooting (4 items)
- Leak Troubleshoot - $95
- Leak Fix - $95
- Faucet Replacement - $95
- Random Plumbing Parts Installation - $95

## 🎨 Example: Adding a New Service Category

Let's add a new "Water Heater Services" category:

```sql
-- Step 1: Create the category
INSERT INTO service_categories (
  id, 
  name, 
  description, 
  category, 
  price_range_min, 
  price_range_max, 
  estimated_duration, 
  display_order
) VALUES (
  'water-heater-services',
  'Water Heater Services',
  'Installation, repair, and maintenance of water heaters',
  'installation',
  200,
  1500,
  180,
  6
);

-- Step 2: Add services to it
INSERT INTO service_items (
  id, category_id, name, description,
  unit_price, parts_extra, estimated_duration, display_order
) VALUES 
(
  'water-heater-repair',
  'water-heater-services',
  'Water Heater Repair',
  'Diagnose and repair existing unit',
  250, true, 120, 1
),
(
  'water-heater-install',
  'water-heater-services',
  'Water Heater Installation',
  'Complete installation of new unit',
  850, true, 240, 2
),
(
  'water-heater-flush',
  'water-heater-services',
  'Water Heater Flush & Maintenance',
  'Annual maintenance service',
  150, false, 90, 3
);
```

Refresh your website → New category appears! 🎊

## 🔄 Seasonal Pricing Example

Update all bathroom services for winter season:

```sql
-- Increase all bathroom rough-in prices by 15%
UPDATE service_items 
SET unit_price = ROUND(unit_price * 1.15) 
WHERE category_id = 'bathroom-rough-in';

-- Update the category price range
UPDATE service_categories 
SET 
  price_range_min = ROUND(price_range_min * 1.15),
  price_range_max = ROUND(price_range_max * 1.15)
WHERE id = 'bathroom-rough-in';
```

## 📊 Useful Queries

### View All Active Services
```sql
SELECT 
  sc.name as category,
  si.name as service,
  si.unit_price as price
FROM service_items si
JOIN service_categories sc ON si.category_id = sc.id
WHERE si.is_active = true
ORDER BY sc.display_order, si.display_order;
```

### Count Services per Category
```sql
SELECT 
  sc.name as category,
  COUNT(si.id) as service_count,
  MIN(si.unit_price) as min_price,
  MAX(si.unit_price) as max_price
FROM service_categories sc
LEFT JOIN service_items si ON sc.id = si.category_id
WHERE sc.is_active = true AND si.is_active = true
GROUP BY sc.name
ORDER BY sc.display_order;
```

### Find Most Expensive Services
```sql
SELECT 
  si.name,
  sc.name as category,
  si.unit_price
FROM service_items si
JOIN service_categories sc ON si.category_id = sc.id
WHERE si.is_active = true
ORDER BY si.unit_price DESC
LIMIT 10;
```

### Services Requiring Extra Parts
```sql
SELECT name, unit_price, category_id
FROM service_items
WHERE parts_extra = true AND is_active = true;
```

## 🛡️ Best Practices

### ID Naming
- Use kebab-case: `water-heater-repair`
- Be descriptive but concise
- Include category prefix for clarity: `kitchen-sink-install`

### Display Order
- Start with 1, increment by 1
- Leave gaps (10, 20, 30) if you plan to insert items later
- Lower numbers appear first

### Pricing
- Always use whole numbers (no decimals)
- Prices are in dollars
- Set realistic ranges for categories

### Descriptions
- Keep short and clear
- Mention if parts are extra
- Include key details customers need

### Soft Delete vs Hard Delete
- **Soft delete** (recommended): Set `is_active = false`
  - Keeps history
  - Can be restored
  - No broken references
- **Hard delete**: `DELETE FROM ...`
  - Permanent removal
  - Cannot be undone
  - Use only if certain

## 🔐 Security

### Current Setup
- ✅ Public users: Can READ active services only
- ✅ Modifications: Require authentication
- ⚠️ Admin API routes: Currently open

### For Production
You should implement authentication for admin routes:
1. Set up Supabase Auth
2. Add role-based access control
3. Protect admin API endpoints
4. Add audit logging

## 🆘 Troubleshooting

**Services not appearing?**
- Check `is_active = true` for both category and item
- Verify `display_order` is set
- Check browser console for errors

**Wrong prices showing?**
- Clear browser cache
- Verify database values in Supabase dashboard
- Check no multipliers in code affecting prices

**Can't modify services?**
- Verify you're logged into Supabase
- Check RLS policies in database settings
- Try using SQL Editor instead of Table Editor

**Category not showing items?**
- Verify `category_id` matches exactly
- Check both category and items are active
- Confirm at least one item exists

## 📞 Support Resources

1. **Supabase Dashboard**: https://supabase.com/dashboard/project/elqkduzhcjsgsoksastu
2. **Documentation Files**:
   - `QUICKSTART_SUPABASE.md` - Quick start
   - `SUPABASE_SETUP.md` - Technical details
   - `SUPABASE_INTEGRATION_SUMMARY.md` - What was done
3. **Supabase Docs**: https://supabase.com/docs
4. **SQL Reference**: https://www.postgresql.org/docs/

## 🎊 Benefits Summary

| Before | After |
|--------|-------|
| Services hardcoded | ✅ Services in database |
| Need developer to change | ✅ Update from dashboard |
| Deploy required | ✅ Instant updates |
| Risk of breaking code | ✅ Safe with RLS |
| No service history | ✅ Can track changes |
| One pricing model | ✅ Can do seasonal pricing |

## 🚀 What's Next?

Now that you have dynamic services, you can:
1. Update prices anytime for promotions
2. Add new services as you expand
3. Hide services temporarily (seasonal)
4. Track pricing history
5. Build an admin dashboard (future)
6. Add service analytics (future)

---

**Your database is ready! Start managing your services like a pro.** 🎉

