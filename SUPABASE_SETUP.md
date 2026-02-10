# Supabase Setup Guide

## Current Issue

Your Supabase project (`elqkduzhcjsgsoksastu`) is not accessible. The DNS lookup fails, which means either:
- The project was deleted
- The project was paused (free tier)
- The URL is incorrect

## Quick Fix

### Step 1: Check Existing Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign in with your account
3. Look for project `elqkduzhcjsgsoksastu`

**If you see the project:**
- Check if it says "Paused" - free tier projects pause after inactivity
- Click "Resume" or "Restore" to reactivate it
- Wait 2-3 minutes for DNS to propagate
- Run the test script again: `node test-supabase-connection.cjs`

**If you don't see the project:**
- It may have been deleted
- Follow the steps below to create a new one

### Step 2: Create New Supabase Project

1. **Go to Supabase Dashboard**
   - Visit [https://app.supabase.com](https://app.supabase.com)
   - Sign in or create an account

2. **Create New Project**
   - Click "New Project"
   - Choose your organization
   - Fill in project details:
     - **Name**: `bluemenplumbing`
     - **Database Password**: (create a strong password and save it)
     - **Region**: Choose closest to your location
   - Click "Create new project"
   - Wait 2-3 minutes for setup

3. **Get Your Credentials**
   - Go to Project Settings (gear icon)
   - Click "API" in the sidebar
   - You'll see:
     - **Project URL**: `https://xxxxx.supabase.co`
     - **anon/public key**: `eyJhbG...` (long JWT token)

4. **Update Your `.env.local` File**

```bash
# Replace these with your NEW project credentials
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_NEW_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJI...YOUR_NEW_ANON_KEY_HERE

# Keep your email settings
RESEND_API_KEY=your_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev
RESEND_TO_EMAIL=searahmad22@gmail.com
```

### Step 3: Set Up Database Tables

Your application needs the following tables. Run these SQL commands in Supabase SQL Editor:

1. **Go to SQL Editor**
   - In your Supabase dashboard
   - Click "SQL Editor" in the left sidebar
   - Click "New Query"

2. **Create Tables** - Copy and paste this SQL:

```sql
-- Create service_categories table
CREATE TABLE IF NOT EXISTS public.service_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('rough-in', 'finishing', 'kitchen', 'laundry', 'repair', 'maintenance')),
    price_range_min NUMERIC DEFAULT 0,
    price_range_max NUMERIC DEFAULT 0,
    estimated_duration INTEGER DEFAULT 60,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create service_items table
CREATE TABLE IF NOT EXISTS public.service_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID REFERENCES public.service_categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    unit_price NUMERIC DEFAULT 0,
    parts_extra BOOLEAN DEFAULT false,
    parts_price NUMERIC DEFAULT 0,
    estimated_duration INTEGER DEFAULT 60,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create quotes table
CREATE TABLE IF NOT EXISTS public.quotes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    quote_id TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    property_type TEXT,
    address_street TEXT,
    address_city TEXT,
    address_state TEXT,
    address_zip TEXT,
    selected_services JSONB DEFAULT '[]'::jsonb,
    selected_categories JSONB DEFAULT '[]'::jsonb,
    custom_service TEXT,
    problem_description TEXT,
    urgency TEXT DEFAULT 'standard',
    estimated_price NUMERIC DEFAULT 0,
    estimated_duration INTEGER DEFAULT 120,
    status TEXT DEFAULT 'submitted' CHECK (status IN ('draft', 'submitted', 'contacted', 'approved', 'completed', 'cancelled')),
    access_notes TEXT,
    preferred_datetime TIMESTAMP WITH TIME ZONE,
    photos JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_service_items_category_id ON public.service_items(category_id);
CREATE INDEX IF NOT EXISTS idx_quotes_email ON public.quotes(email);
CREATE INDEX IF NOT EXISTS idx_quotes_quote_id ON public.quotes(quote_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON public.quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON public.quotes(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to service_categories"
    ON public.service_categories FOR SELECT
    USING (true);

CREATE POLICY "Allow public read access to service_items"
    ON public.service_items FOR SELECT
    USING (true);

-- Create policy for public quote insertion
CREATE POLICY "Allow public insert access to quotes"
    ON public.quotes FOR INSERT
    WITH CHECK (true);

-- Create policy for authenticated read access to quotes
CREATE POLICY "Allow authenticated read access to quotes"
    ON public.quotes FOR SELECT
    USING (auth.role() = 'authenticated');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER set_service_categories_updated_at
    BEFORE UPDATE ON public.service_categories
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_service_items_updated_at
    BEFORE UPDATE ON public.service_items
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_quotes_updated_at
    BEFORE UPDATE ON public.quotes
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
```

3. **Click "Run"** to execute the SQL

### Step 4: Test Your Connection

```bash
# Run the diagnostic tool
node test-supabase-connection.cjs

# If it passes, restart your dev server
npm run dev
```

### Step 5: Populate Sample Data (Optional)

If you want some test data, run this in the SQL Editor:

```sql
-- Insert sample service categories
INSERT INTO public.service_categories (id, name, description, category, price_range_min, price_range_max, estimated_duration, display_order) VALUES
('rough-in-plumbing', 'Rough-In Plumbing', 'New construction and renovation plumbing installation', 'rough-in', 150, 500, 180, 1),
('finishing-plumbing', 'Finishing Plumbing', 'Final fixture installation and connections', 'finishing', 100, 400, 120, 2),
('kitchen-plumbing', 'Kitchen Plumbing', 'Kitchen sink, dishwasher, and appliance connections', 'kitchen', 125, 450, 150, 3),
('laundry-plumbing', 'Laundry Plumbing', 'Washer/dryer hookups and utility room plumbing', 'laundry', 100, 350, 120, 4),
('repair-services', 'Repair Services', 'Fix leaks, clogs, and plumbing issues', 'repair', 75, 300, 90, 5),
('maintenance', 'Maintenance', 'Regular maintenance and inspection services', 'maintenance', 80, 250, 60, 6);

-- Insert sample service items
INSERT INTO public.service_items (category_id, name, description, unit_price, parts_extra, estimated_duration, display_order) VALUES
('rough-in-plumbing', 'Rough-in for bathroom', 'Complete rough-in plumbing for new bathroom', 350, true, 240, 1),
('rough-in-plumbing', 'Rough-in for kitchen', 'Complete rough-in plumbing for new kitchen', 400, true, 300, 2),
('finishing-plumbing', 'Install toilet', 'Standard toilet installation', 150, false, 60, 1),
('finishing-plumbing', 'Install sink and faucet', 'Bathroom or kitchen sink installation', 200, false, 90, 2),
('kitchen-plumbing', 'Install garbage disposal', 'Garbage disposal installation', 175, false, 75, 1),
('kitchen-plumbing', 'Connect dishwasher', 'Dishwasher water line and drain connection', 150, false, 60, 2),
('laundry-plumbing', 'Washer hookup', 'Connect washing machine water lines and drain', 125, false, 60, 1),
('repair-services', 'Fix leaky faucet', 'Repair or replace leaking faucet', 100, true, 45, 1),
('repair-services', 'Unclog drain', 'Clear clogged drains', 125, false, 60, 2),
('repair-services', 'Fix running toilet', 'Repair toilet that runs constantly', 100, true, 45, 3),
('maintenance', 'Water heater flush', 'Drain and flush water heater', 125, false, 60, 1);
```

## Troubleshooting

### Connection still fails after setup
1. Wait 2-3 minutes for DNS propagation
2. Clear your browser cache
3. Restart your dev server
4. Run: `node test-supabase-connection.cjs`

### Tables not showing up
1. Check you ran the SQL in the correct project
2. Refresh the Table Editor page
3. Check for SQL errors in the query output

### Authentication errors
1. Verify you copied the correct anon/public key (not the service_role key)
2. Check that RLS policies are created
3. Ensure `.env.local` has no extra spaces or quotes

## Support

- Supabase Documentation: [https://supabase.com/docs](https://supabase.com/docs)
- Supabase Discord: [https://discord.supabase.com](https://discord.supabase.com)
- Check Supabase Status: [https://status.supabase.com](https://status.supabase.com)

## Next Steps

After Supabase is working:
1. Configure Resend for email notifications (see QUOTE_SYSTEM_SETUP.md)
2. Test the quote submission form
3. Check the Supabase dashboard to see submitted quotes
