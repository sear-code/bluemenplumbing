-- ================================================
-- Blue Men Plumbing - Initial Service Data
-- ================================================
-- Run this after supabase-schema.sql to populate the database

-- Clear existing data (if any)
DELETE FROM service_items;
DELETE FROM service_categories;

-- ================================================
-- INSERT SERVICE CATEGORIES
-- ================================================

INSERT INTO service_categories (id, name, description, category, price_range_min, price_range_max, estimated_duration, display_order) VALUES
('bathroom-rough-in', 'Bathroom Rough-In', 'Complete plumbing installation for new bathrooms during construction or renovation (behind walls)', 'rough-in', 50, 3000, 240, 1),
('bathroom-finishing', 'Bathroom Finishing', 'Installation of bathroom fixtures and final plumbing connections (visible parts)', 'finishing', 50, 450, 120, 2),
('kitchen-plumbing', 'Kitchen Plumbing', 'Complete kitchen plumbing installation including appliances and fixtures', 'kitchen', 125, 250, 120, 3),
('laundry-connections', 'Laundry Connections', 'Washing machine and dryer water and drain connections', 'laundry', 85, 130, 60, 4),
('repairs-troubleshooting', 'Repairs & Troubleshooting', 'Quick repairs and leak troubleshooting for existing plumbing', 'repair', 95, 95, 60, 5);

-- ================================================
-- INSERT SERVICE ITEMS
-- ================================================

-- Bathroom Rough-In Items (12 items)
INSERT INTO service_items (id, category_id, name, description, unit_price, parts_extra, parts_price, estimated_duration, display_order) VALUES
('rough-shower-diverter-basic', 'bathroom-rough-in', 'Shower Diverter (Basic)', NULL, 250, false, 0, 90, 1),
('rough-shower-diverter-custom', 'bathroom-rough-in', 'Shower Diverter (Custom)', NULL, 300, false, 0, 120, 2),
('rough-bathtub-install', 'bathroom-rough-in', 'Bath Tub Installation', 'Parts not included', 400, true, 0, 180, 3),
('rough-standing-shower-drain', 'bathroom-rough-in', 'Standing Shower Drain', NULL, 250, false, 0, 90, 4),
('rough-freestanding-tub', 'bathroom-rough-in', 'Free Standing Tub', 'Parts not included', 250, true, 0, 120, 5),
('rough-freestanding-shower', 'bathroom-rough-in', 'Free Standing Shower', NULL, 150, false, 0, 60, 6),
('rough-valve-install', 'bathroom-rough-in', 'Valve Installation', NULL, 50, false, 0, 30, 7),
('rough-fridge-waterline', 'bathroom-rough-in', 'Fridge Water Line', NULL, 125, false, 0, 60, 8),
('rough-single-to-double-vanity', 'bathroom-rough-in', 'Convert Single Vanity to Double', NULL, 200, false, 0, 120, 9),
('rough-toilet-flange-repair', 'bathroom-rough-in', 'Toilet Flange Repair', NULL, 95, false, 0, 45, 10),
('rough-3piece-bathroom', 'bathroom-rough-in', '3-Piece Bathroom Rough-In (Complete Package)', 'Complete bathroom rough-in package', 1750, false, 0, 480, 11),
('rough-3piece-basement', 'bathroom-rough-in', '3-Piece Bathroom Basement with Permit', 'Includes permit costs', 3000, false, 0, 600, 12);

-- Bathroom Finishing Items (9 items)
INSERT INTO service_items (id, category_id, name, description, unit_price, parts_extra, parts_price, estimated_duration, display_order) VALUES
('finish-shower-fixture', 'bathroom-finishing', 'Shower Fixture Installation', NULL, 75, false, 0, 45, 1),
('finish-vanity-plumbing-only', 'bathroom-finishing', 'Vanity Complete Plumbing ONLY', NULL, 125, false, 0, 60, 2),
('finish-faucet-ptrap', 'bathroom-finishing', 'Faucet + P-Trap ONLY', NULL, 95, false, 0, 45, 3),
('finish-vanity-install-plumbing', 'bathroom-finishing', 'Vanity Installation + Plumbing', NULL, 250, false, 0, 120, 4),
('finish-toilet-install', 'bathroom-finishing', 'Toilet Installation', NULL, 125, false, 0, 60, 5),
('finish-freestanding-tub', 'bathroom-finishing', 'Free Standing Tub Installation', NULL, 85, false, 0, 60, 6),
('finish-freestanding-shower', 'bathroom-finishing', 'Free Standing Shower Installation', NULL, 85, false, 0, 60, 7),
('finish-double-vanity', 'bathroom-finishing', 'Double Vanity + Plumbing', NULL, 450, false, 0, 180, 8),
('finish-toilet-bidet', 'bathroom-finishing', 'Toilet Bidet Installation', NULL, 50, false, 0, 30, 9);

-- Kitchen Plumbing Items (3 items)
INSERT INTO service_items (id, category_id, name, description, unit_price, parts_extra, parts_price, estimated_duration, display_order) VALUES
('kitchen-complete', 'kitchen-plumbing', 'Complete Kitchen Plumbing', NULL, 150, false, 0, 120, 1),
('kitchen-dishwasher', 'kitchen-plumbing', 'Dishwasher Installation', NULL, 125, false, 0, 60, 2),
('kitchen-dishwasher-plumbing', 'kitchen-plumbing', 'Dishwasher + Kitchen Plumbing', NULL, 250, false, 0, 120, 3);

-- Laundry Connections Items (2 items)
INSERT INTO service_items (id, category_id, name, description, unit_price, parts_extra, parts_price, estimated_duration, display_order) VALUES
('laundry-no-parts', 'laundry-connections', 'Washing Machine + Dryer (No Parts)', NULL, 85, false, 0, 45, 1),
('laundry-with-parts', 'laundry-connections', 'Washing Machine + Dryer (With Parts)', NULL, 130, false, 0, 60, 2);

-- Repairs & Troubleshooting Items (4 items)
INSERT INTO service_items (id, category_id, name, description, unit_price, parts_extra, parts_price, estimated_duration, display_order) VALUES
('repair-leak-troubleshoot', 'repairs-troubleshooting', 'Leak Troubleshoot', NULL, 95, false, 0, 60, 1),
('repair-leak-fix', 'repairs-troubleshooting', 'Leak Fix', NULL, 95, false, 0, 60, 2),
('repair-faucet-replacement', 'repairs-troubleshooting', 'Faucet Replacement', NULL, 95, false, 0, 45, 3),
('repair-random-parts', 'repairs-troubleshooting', 'Random Plumbing Parts Installation', 'Parts not included', 95, true, 0, 45, 4);

-- ================================================
-- Verify Data
-- ================================================

DO $$
DECLARE
  category_count INTEGER;
  item_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO category_count FROM service_categories;
  SELECT COUNT(*) INTO item_count FROM service_items;
  
  RAISE NOTICE '';
  RAISE NOTICE '✅ Data imported successfully!';
  RAISE NOTICE '-----------------------------------';
  RAISE NOTICE 'Service Categories: %', category_count;
  RAISE NOTICE 'Service Items: %', item_count;
  RAISE NOTICE '';
  RAISE NOTICE 'Next step: Update your .env.local with Supabase credentials';
END $$;



