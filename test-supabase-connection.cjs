#!/usr/bin/env node

/**
 * Supabase Connection Test Script
 * 
 * This script helps diagnose connection issues with your Supabase database.
 * Run it with: node test-supabase-connection.cjs
 */

const https = require('https');
const dns = require('dns').promises;
require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Supabase Connection Diagnostic Tool\n');
console.log('=' .repeat(50));

// Test 1: Check environment variables
console.log('\n✓ Test 1: Checking environment variables...');
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing environment variables!');
  console.log('   SUPABASE_URL:', SUPABASE_URL ? '✓ Set' : '✗ Missing');
  console.log('   SUPABASE_KEY:', SUPABASE_KEY ? '✓ Set' : '✗ Missing');
  console.log('\n   Please check your .env.local file.');
  process.exit(1);
}

console.log('   SUPABASE_URL:', SUPABASE_URL);
console.log('   SUPABASE_KEY:', SUPABASE_KEY.substring(0, 20) + '...');

// Test 2: Extract hostname
console.log('\n✓ Test 2: Extracting hostname...');
let hostname;
try {
  const url = new URL(SUPABASE_URL);
  hostname = url.hostname;
  console.log('   Hostname:', hostname);
} catch (error) {
  console.error('❌ Invalid Supabase URL:', error.message);
  process.exit(1);
}

// Test 3: DNS resolution
console.log('\n✓ Test 3: Testing DNS resolution...');
dns.lookup(hostname)
  .then((result) => {
    console.log('   ✓ DNS Resolution successful');
    console.log('   IP Address:', result.address);
    console.log('   IP Family:', result.family);
  })
  .catch((error) => {
    console.error('   ❌ DNS Resolution failed:', error.code);
    console.log('\n   Possible causes:');
    console.log('   1. No internet connection');
    console.log('   2. DNS server issues');
    console.log('   3. Supabase project may have been deleted');
    console.log('   4. Firewall/VPN blocking connection');
    console.log('\n   Solutions:');
    console.log('   - Check your internet connection');
    console.log('   - Try accessing', SUPABASE_URL, 'in your browser');
    console.log('   - Verify your Supabase project is active at https://app.supabase.com');
    console.log('   - Check if VPN/firewall is blocking connection');
    process.exit(1);
  })
  .then(() => {
    // Test 4: HTTP connectivity
    console.log('\n✓ Test 4: Testing HTTP connectivity...');
    return new Promise((resolve, reject) => {
      const testUrl = `${SUPABASE_URL}/rest/v1/`;
      const urlObj = new URL(testUrl);
      
      const options = {
        hostname: urlObj.hostname,
        port: 443,
        path: urlObj.pathname,
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        },
        timeout: 10000
      };

      const req = https.request(options, (res) => {
        console.log('   ✓ HTTP Connection successful');
        console.log('   Status Code:', res.statusCode);
        console.log('   Status Message:', res.statusMessage);
        
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          if (res.statusCode === 200) {
            console.log('\n✅ All tests passed! Your Supabase connection is working.');
          } else if (res.statusCode === 401) {
            console.log('\n⚠️  Connection successful but authentication failed.');
            console.log('   Please verify your SUPABASE_ANON_KEY is correct.');
          } else {
            console.log('\n⚠️  Connection successful but received unexpected status.');
          }
          resolve();
        });
      });

      req.on('error', (error) => {
        console.error('   ❌ HTTP Connection failed:', error.message);
        console.log('\n   Error code:', error.code);
        reject(error);
      });

      req.on('timeout', () => {
        console.error('   ❌ Connection timeout (10s)');
        req.destroy();
        reject(new Error('Timeout'));
      });

      req.end();
    });
  })
  .catch((error) => {
    if (error.code === 'ENOTFOUND') {
      console.log('\n   This error occurred during DNS resolution - see Test 3 above.');
    } else {
      console.log('\n   Possible causes:');
      console.log('   1. Firewall blocking connection');
      console.log('   2. Network proxy issues');
      console.log('   3. Supabase service temporarily down');
      console.log('\n   Solutions:');
      console.log('   - Check firewall settings');
      console.log('   - Try disabling VPN temporarily');
      console.log('   - Check Supabase status at https://status.supabase.com');
    }
    process.exit(1);
  })
  .then(() => {
    console.log('\n' + '='.repeat(50));
    console.log('\nNext steps:');
    console.log('1. If all tests passed, restart your Next.js dev server');
    console.log('2. If tests failed, follow the suggested solutions above');
    console.log('3. Verify your Supabase project at: https://app.supabase.com');
    process.exit(0);
  });
