-- ================================================
-- Add Quotes Table to Existing Blue Men Plumbing Database
-- ================================================
-- Run this SQL in your Supabase SQL Editor to add quotes functionality
-- Only run this if you already have service_categories and service_items tables

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

-- Create trigger for automatic updated_at
DROP TRIGGER IF EXISTS update_quotes_updated_at ON quotes;
CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS on quotes table
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

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
  RAISE NOTICE '✅ Quotes table created successfully!';
  RAISE NOTICE '📋 Table: quotes';
  RAISE NOTICE '🔒 RLS policies configured';
  RAISE NOTICE '📊 Indexes created for optimal performance';
  RAISE NOTICE '';
  RAISE NOTICE 'Next: Configure your .env.local with Supabase credentials';
END $$;
