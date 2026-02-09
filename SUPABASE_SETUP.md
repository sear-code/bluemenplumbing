# Supabase Database Setup - Blue Men Plumbing

## Overview

Your project is now connected to Supabase for dynamic service management. All services in the quote generation section are now fetched from the database, allowing you to easily add, edit, or delete services without touching the code.

## Database Information

- **Project Name**: bluemenplumbing
- **Region**: Canada Central (ca-central-1)
- **Project ID**: elqkduzhcjsgsoksastu
- **API URL**: https://elqkduzhcjsgsoksastu.supabase.co

## Environment Variables

Add these to your `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://elqkduzhcjsgsoksastu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVscWtkdXpoY2pzZ3Nva3Nhc3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3NzUwMjcsImV4cCI6MjA4MzM1MTAyN30.c7p4OIcerriPBg7Ca0LUOzuvLHwV9D4OuGEi5vbmw9c
```

## Database Schema

### Tables

#### `service_categories`
Stores the main service categories (Bathroom Rough-In, Kitchen Plumbing, etc.)

**Columns:**
- `id` (TEXT, PRIMARY KEY) - Unique identifier (e.g., 'bathroom-rough-in')
- `name` (TEXT) - Display name (e.g., 'Bathroom Rough-In')
- `description` (TEXT) - Category description
- `category` (TEXT) - Category type: 'rough-in', 'finishing', 'kitchen', 'laundry', 'repair', 'maintenance'
- `price_range_min` (INTEGER) - Minimum price in dollars
- `price_range_max` (INTEGER) - Maximum price in dollars
- `estimated_duration` (INTEGER) - Estimated duration in minutes
- `display_order` (INTEGER) - Order for sorting
- `is_active` (BOOLEAN) - Active/inactive status
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### `service_items`
Stores individual service items within categories

**Columns:**
- `id` (TEXT, PRIMARY KEY) - Unique identifier (e.g., 'rough-shower-diverter-basic')
- `category_id` (TEXT, FOREIGN KEY) - References service_categories(id)
- `name` (TEXT) - Display name (e.g., 'Shower Diverter (Basic)')
- `description` (TEXT) - Item description
- `unit_price` (INTEGER) - Price in dollars
- `parts_extra` (BOOLEAN) - Whether parts are extra cost
- `parts_price` (INTEGER) - Additional parts cost
- `estimated_duration` (INTEGER) - Estimated duration in minutes
- `display_order` (INTEGER) - Order for sorting within category
- `is_active` (BOOLEAN) - Active/inactive status
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## API Routes

### Public Routes

#### `GET /api/services`
Fetches all active service categories with their items

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "bathroom-rough-in",
      "name": "Bathroom Rough-In",
      "description": "Complete plumbing installation...",
      "category": "rough-in",
      "priceRangeMin": 50,
      "priceRangeMax": 3000,
      "estimatedDuration": 240,
      "displayOrder": 1,
      "items": [...]
    }
  ]
}
```

### Admin Routes

#### `GET /api/admin/services/categories`
Get all categories (including inactive)

#### `POST /api/admin/services/categories`
Create a new category

**Body:**
```json
{
  "id": "new-category",
  "name": "New Category",
  "description": "Description",
  "category": "repair",
  "price_range_min": 100,
  "price_range_max": 500,
  "estimated_duration": 120,
  "display_order": 6
}
```

#### `PUT /api/admin/services/categories`
Update an existing category

**Body:**
```json
{
  "id": "bathroom-rough-in",
  "name": "Updated Name",
  "price_range_max": 3500
}
```

#### `DELETE /api/admin/services/categories?id=category-id`
Soft-delete a category (sets is_active to false)

#### Service Items Routes
Same pattern for service items:
- `GET /api/admin/services/items?category_id=optional`
- `POST /api/admin/services/items`
- `PUT /api/admin/services/items`
- `DELETE /api/admin/services/items?id=item-id`

## How to Manage Services

### Option 1: Using the Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Select your project: **bluemenplumbing**
3. Navigate to **Table Editor** in the left sidebar
4. Select either `service_categories` or `service_items`
5. Add, edit, or delete rows directly in the UI

### Option 2: Using SQL

1. Go to **SQL Editor** in Supabase Dashboard
2. Run queries to modify data:

**Add a new service category:**
```sql
INSERT INTO service_categories (
  id, name, description, category, 
  price_range_min, price_range_max, 
  estimated_duration, display_order
) VALUES (
  'hvac-services',
  'HVAC Services',
  'Heating, ventilation, and air conditioning',
  'maintenance',
  150, 800, 180, 6
);
```

**Add a new service item:**
```sql
INSERT INTO service_items (
  id, category_id, name, description, 
  unit_price, parts_extra, estimated_duration, display_order
) VALUES (
  'hvac-thermostat-install',
  'hvac-services',
  'Thermostat Installation',
  'Install and configure new thermostat',
  125, false, 60, 1
);
```

**Update a price:**
```sql
UPDATE service_items 
SET unit_price = 150 
WHERE id = 'rough-shower-diverter-basic';
```

**Deactivate a service (soft delete):**
```sql
UPDATE service_items 
SET is_active = false 
WHERE id = 'service-to-hide';
```

### Option 3: Using API Routes (Programmatically)

Use tools like Postman or curl to hit the admin API routes:

```bash
# Create a new service item
curl -X POST https://your-domain.com/api/admin/services/items \
  -H "Content-Type: application/json" \
  -d '{
    "id": "new-service",
    "category_id": "repairs-troubleshooting",
    "name": "New Service",
    "unit_price": 95,
    "parts_extra": false,
    "estimated_duration": 60,
    "display_order": 5
  }'
```

## Security

- **Row Level Security (RLS)** is enabled on both tables
- Public users can only **read** active services
- **Insert/Update/Delete** operations require authentication
- For production, you should implement proper authentication and admin roles

## How It Works

1. User opens the quote generator
2. The `ServiceSelectorTwoTier` component fetches services from `/api/services`
3. Services are loaded from Supabase in real-time
4. Any changes you make in the database instantly reflect in the app (after refresh)

## Current Data

The database has been pre-populated with all your existing services:

- **Bathroom Rough-In** (12 items)
- **Bathroom Finishing** (9 items)
- **Kitchen Plumbing** (3 items)
- **Laundry Connections** (2 items)
- **Repairs & Troubleshooting** (4 items)

Total: **5 categories, 30 service items**

## Next Steps

1. **Add Environment Variables**: Copy the variables to your `.env.local` file
2. **Test the Integration**: Start your dev server and open the quote generator
3. **Customize Services**: Add, edit, or remove services using any of the methods above
4. **Set Up Authentication** (Optional): Implement auth for the admin routes
5. **Build Admin UI** (Optional): Create a management dashboard for easier service editing

## Troubleshooting

**Services not loading?**
- Check that environment variables are set correctly
- Ensure the dev server was restarted after adding .env.local
- Check browser console for errors

**Can't modify services from dashboard?**
- Verify you're logged into the correct Supabase project
- Check that RLS policies allow your operations

**Need help?**
- Check Supabase logs in the dashboard
- Review the Network tab in browser DevTools
- Check the server console for error messages

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Dashboard](https://supabase.com/dashboard/project/elqkduzhcjsgsoksastu)
- [SQL Reference](https://supabase.com/docs/guides/database/overview)

