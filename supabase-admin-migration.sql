-- Admin Panel Migration
-- Run this in Supabase SQL Editor

-- 1. Admin Settings (singleton table for global pricing config)
CREATE TABLE IF NOT EXISTS admin_settings (
  id TEXT PRIMARY KEY DEFAULT 'global',
  markup_percentage NUMERIC(5,2) NOT NULL DEFAULT 20.00,
  emergency_fee INTEGER NOT NULL DEFAULT 250,
  travel_rate_per_km NUMERIC(5,2) NOT NULL DEFAULT 1.00,
  max_service_radius_km INTEGER NOT NULL DEFAULT 60,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO admin_settings (id, markup_percentage, emergency_fee, travel_rate_per_km, max_service_radius_km)
VALUES ('global', 20.00, 250, 1.00, 60)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for admin_settings"
  ON admin_settings FOR SELECT USING (true);

CREATE POLICY "Allow authenticated full access to admin_settings"
  ON admin_settings FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_admin_settings_updated_at
  BEFORE UPDATE ON admin_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 2. Service Areas (replaces hardcoded city config)
CREATE TABLE IF NOT EXISTS service_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_name TEXT NOT NULL UNIQUE,
  zone TEXT NOT NULL CHECK (zone IN ('core', 'extended')),
  distance_km INTEGER NOT NULL DEFAULT 0,
  nearest_core_city TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO service_areas (city_name, zone, distance_km, nearest_core_city, display_order) VALUES
  ('North York', 'core', 0, NULL, 1),
  ('Scarborough', 'core', 0, NULL, 2),
  ('Markham', 'core', 0, NULL, 3),
  ('Richmond Hill', 'core', 0, NULL, 4),
  ('Pickering', 'core', 0, NULL, 5),
  ('Ajax', 'core', 0, NULL, 6),
  ('Toronto', 'core', 0, NULL, 7),
  ('Etobicoke', 'extended', 15, 'North York', 8),
  ('Whitby', 'extended', 12, 'Ajax', 9),
  ('Oshawa', 'extended', 24, 'Ajax', 10),
  ('Bowmanville', 'extended', 45, 'Ajax', 11),
  ('Mississauga', 'extended', 28, 'Scarborough', 12),
  ('Oakville', 'extended', 45, 'Scarborough', 13),
  ('Burlington', 'extended', 58, 'Scarborough', 14),
  ('Vaughan', 'extended', 18, 'Richmond Hill', 15),
  ('Brampton', 'extended', 35, 'Richmond Hill', 16),
  ('Newmarket', 'extended', 22, 'Richmond Hill', 17)
ON CONFLICT (city_name) DO NOTHING;

ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for active service_areas"
  ON service_areas FOR SELECT USING (is_active = true);

CREATE POLICY "Allow authenticated full access to service_areas"
  ON service_areas FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER update_service_areas_updated_at
  BEFORE UPDATE ON service_areas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 3. Add scheduling and notes fields to quotes
ALTER TABLE quotes
  ADD COLUMN IF NOT EXISTS scheduled_date DATE,
  ADD COLUMN IF NOT EXISTS scheduled_time TIME,
  ADD COLUMN IF NOT EXISTS internal_notes TEXT,
  ADD COLUMN IF NOT EXISTS technician_notes TEXT;

CREATE INDEX IF NOT EXISTS idx_quotes_scheduled_date ON quotes(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at);

-- 4. Quote status history (audit trail)
CREATE TABLE IF NOT EXISTS quote_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  previous_status TEXT,
  new_status TEXT NOT NULL,
  changed_by TEXT DEFAULT 'admin',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quote_status_history_quote_id ON quote_status_history(quote_id);

ALTER TABLE quote_status_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated full access to quote_status_history"
  ON quote_status_history FOR ALL USING (auth.role() = 'authenticated');
