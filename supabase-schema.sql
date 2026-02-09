-- ================================================
-- Blue Men Plumbing - Supabase Database Schema
-- ================================================
-- Run this SQL in your Supabase SQL Editor to set up the database

-- Create service_categories table
CREATE TABLE IF NOT EXISTS service_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('rough-in', 'finishing', 'kitchen', 'laundry', 'repair', 'maintenance')),
  price_range_min INTEGER DEFAULT 0,
  price_range_max INTEGER DEFAULT 0,
  estimated_duration INTEGER DEFAULT 0,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create service_items table
CREATE TABLE IF NOT EXISTS service_items (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES service_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  unit_price INTEGER DEFAULT 0,
  parts_extra BOOLEAN DEFAULT false,
  parts_price INTEGER DEFAULT 0,
  estimated_duration INTEGER DEFAULT 0,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_service_items_category_id ON service_items(category_id);
CREATE INDEX IF NOT EXISTS idx_service_categories_active ON service_categories(is_active);
CREATE INDEX IF NOT EXISTS idx_service_items_active ON service_items(is_active);

-- Create quotes table
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id TEXT UNIQUE NOT NULL,
  
  -- Customer Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Property Information
  property_type TEXT,
  address_street TEXT,
  address_city TEXT,
  address_state TEXT,
  address_zip TEXT,
  
  -- Service Details
  selected_services JSONB DEFAULT '[]'::jsonb,
  selected_categories JSONB DEFAULT '[]'::jsonb,
  custom_service TEXT,
  problem_description TEXT,
  urgency TEXT DEFAULT 'standard',
  
  -- Quote Details
  estimated_price INTEGER DEFAULT 0,
  estimated_duration INTEGER DEFAULT 0,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('draft', 'submitted', 'contacted', 'approved', 'completed', 'cancelled')),
  
  -- Additional Info
  access_notes TEXT,
  preferred_datetime TIMESTAMPTZ,
  photos JSONB DEFAULT '[]'::jsonb,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for quotes table
CREATE INDEX IF NOT EXISTS idx_quotes_email ON quotes(email);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_quote_id ON quotes(quote_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic updated_at
DROP TRIGGER IF EXISTS update_service_categories_updated_at ON service_categories;
CREATE TRIGGER update_service_categories_updated_at
  BEFORE UPDATE ON service_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_service_items_updated_at ON service_items;
CREATE TRIGGER update_service_items_updated_at
  BEFORE UPDATE ON service_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_quotes_updated_at ON quotes;
CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- Row Level Security (RLS) Policies
-- ================================================

-- Enable RLS on all tables
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to active services
DROP POLICY IF EXISTS "Allow public read access to active categories" ON service_categories;
CREATE POLICY "Allow public read access to active categories"
  ON service_categories FOR SELECT
  USING (is_active = true);

DROP POLICY IF EXISTS "Allow public read access to active items" ON service_items;
CREATE POLICY "Allow public read access to active items"
  ON service_items FOR SELECT
  USING (is_active = true);

-- Policy: Allow authenticated users full access (for admin operations)
DROP POLICY IF EXISTS "Allow authenticated full access to categories" ON service_categories;
CREATE POLICY "Allow authenticated full access to categories"
  ON service_categories FOR ALL
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated full access to items" ON service_items;
CREATE POLICY "Allow authenticated full access to items"
  ON service_items FOR ALL
  USING (auth.role() = 'authenticated');

-- For development: Allow service role full access
DROP POLICY IF EXISTS "Allow service role full access to categories" ON service_categories;
CREATE POLICY "Allow service role full access to categories"
  ON service_categories FOR ALL
  USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow service role full access to items" ON service_items;
CREATE POLICY "Allow service role full access to items"
  ON service_items FOR ALL
  USING (auth.role() = 'service_role');

-- Policy: Allow anyone to insert quotes (for public quote form)
DROP POLICY IF EXISTS "Allow public insert quotes" ON quotes;
CREATE POLICY "Allow public insert quotes"
  ON quotes FOR INSERT
  WITH CHECK (true);

-- Policy: Allow authenticated users full access to quotes (for admin)
DROP POLICY IF EXISTS "Allow authenticated full access to quotes" ON quotes;
CREATE POLICY "Allow authenticated full access to quotes"
  ON quotes FOR ALL
  USING (auth.role() = 'authenticated');

-- Policy: Allow service role full access to quotes
DROP POLICY IF EXISTS "Allow service role full access to quotes" ON quotes;
CREATE POLICY "Allow service role full access to quotes"
  ON quotes FOR ALL
  USING (auth.role() = 'service_role');

-- ================================================
-- Success Message
-- ================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Schema created successfully!';
  RAISE NOTICE '📋 Tables created: service_categories, service_items, quotes';
  RAISE NOTICE 'Next: Run supabase-initial-data.sql to populate the service tables';
END $$;



