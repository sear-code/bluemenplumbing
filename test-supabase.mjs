#!/usr/bin/env node

/**
 * Supabase Connection Test Script
 * Run this to verify your Supabase connection is working
 * 
 * Usage: node test-supabase.mjs
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('\n🔍 Testing Supabase Connection...\n');
console.log('═══════════════════════════════════════════════════\n');

// Check environment variables
console.log('📋 Configuration Check:');
if (supabaseUrl) {
  console.log(`  ✅ URL is set: ${supabaseUrl}`);
} else {
  console.log('  ❌ URL is missing');
  console.log('     Add NEXT_PUBLIC_SUPABASE_URL to .env.local');
}

if (supabaseAnonKey) {
  console.log(`  ✅ Anon Key is set: ${supabaseAnonKey.substring(0, 20)}...`);
} else {
  console.log('  ❌ Anon Key is missing');
  console.log('     Add NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local');
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('\n❌ Missing required environment variables');
  console.log('\nPlease check your .env.local file and try again.');
  process.exit(1);
}

console.log('\n═══════════════════════════════════════════════════\n');

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('🔌 Testing database connection...\n');
    
    // Test 1: Query service_categories
    const { data: categories, error: catError } = await supabase
      .from('service_categories')
      .select('id, name, category, is_active')
      .order('display_order');
    
    if (catError) {
      throw new Error(`service_categories query failed: ${catError.message}`);
    }
    
    console.log(`✅ service_categories: ${categories.length} categories found`);
    
    // Test 2: Query service_items
    const { data: items, error: itemError } = await supabase
      .from('service_items')
      .select('id, name, category_id, is_active')
      .order('display_order');
    
    if (itemError) {
      throw new Error(`service_items query failed: ${itemError.message}`);
    }
    
    console.log(`✅ service_items: ${items.length} items found`);
    
    // Test 3: Check if data looks correct
    const activeCategories = categories.filter(c => c.is_active);
    const activeItems = items.filter(i => i.is_active);
    
    console.log('\n═══════════════════════════════════════════════════\n');
    console.log('📊 Database Summary:\n');
    console.log(`  Total Categories: ${categories.length}`);
    console.log(`  Active Categories: ${activeCategories.length}`);
    console.log(`  Total Items: ${items.length}`);
    console.log(`  Active Items: ${activeItems.length}`);
    
    // Show categories
    console.log('\n📁 Categories:');
    categories.forEach((cat, idx) => {
      const itemCount = items.filter(i => i.category_id === cat.id).length;
      const status = cat.is_active ? '✓' : '✗';
      console.log(`  ${idx + 1}. [${status}] ${cat.name} (${itemCount} items)`);
    });
    
    console.log('\n═══════════════════════════════════════════════════');
    console.log('\n✅ SUCCESS! Supabase is connected and working!\n');
    console.log('Your database is ready to use.');
    console.log('Start your dev server: npm run dev\n');
    
    return true;
  } catch (error) {
    console.log('\n═══════════════════════════════════════════════════');
    console.log('\n❌ CONNECTION TEST FAILED\n');
    console.log('Error:', error.message);
    
    console.log('\n🔧 Troubleshooting Steps:');
    console.log('  1. Verify your Supabase project is active');
    console.log('  2. Check credentials in Supabase Dashboard → Settings → API');
    console.log('  3. Ensure .env.local has correct values');
    console.log('  4. Make sure you ran both SQL scripts (schema + data)');
    console.log('  5. Check if your project is paused (free tier limitation)');
    
    console.log('\n📚 For help, see: SUPABASE_SETUP_NEW.md\n');
    
    return false;
  }
}

// Run the test
testConnection().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('\n💥 Unexpected error:', error);
  process.exit(1);
});



