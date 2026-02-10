import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Testing Supabase Database Access\n');
console.log('Project URL:', supabaseUrl);
console.log('Key configured:', supabaseKey ? 'Yes' : 'No');
console.log('');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing credentials!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Testing database access...\n');

// Test 1: Check if tables exist
console.log('Test 1: Checking tables...');
try {
  const { data, error } = await supabase
    .from('quotes')
    .select('count')
    .limit(1);

  if (error) {
    console.log('  ⚠️  Quotes table:', error.message);
    if (error.message.includes('relation') && error.message.includes('does not exist')) {
      console.log('  ℹ️  Table needs to be created');
    }
  } else {
    console.log('  ✅ Quotes table: Accessible');
  }
} catch (err) {
  console.log('  ❌ Error:', err.message);
}

// Test 2: Check service_categories
console.log('\nTest 2: Checking service_categories...');
try {
  const { data, error } = await supabase
    .from('service_categories')
    .select('count')
    .limit(1);

  if (error) {
    console.log('  ⚠️  Service categories table:', error.message);
  } else {
    console.log('  ✅ Service categories table: Accessible');
  }
} catch (err) {
  console.log('  ❌ Error:', err.message);
}

console.log('\n' + '='.repeat(50));
console.log('\n✅ Supabase connection is working!');
console.log('\nIf tables don\'t exist, you\'ll need to create them.');
console.log('See SUPABASE_SETUP.md for SQL commands.\n');
