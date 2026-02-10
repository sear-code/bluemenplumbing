#!/bin/bash

echo "🔄 Monitoring Supabase restoration..."
echo "Press Ctrl+C to stop"
echo ""

count=0
max_attempts=20

while [ $count -lt $max_attempts ]; do
  count=$((count + 1))
  echo "[$count/$max_attempts] Testing connection..."
  
  response=$(curl -s -o /dev/null -w "%{http_code}" "https://elqkduzhcjsgsoksastu.supabase.co/rest/v1/" \
    -H "apikey: $NEXT_PUBLIC_SUPABASE_ANON_KEY" \
    -H "Authorization: Bearer $NEXT_PUBLIC_SUPABASE_ANON_KEY")
  
  if [ "$response" -eq 200 ] || [ "$response" -eq 401 ]; then
    echo ""
    echo "✅ SUCCESS! Supabase is online! (Status: $response)"
    echo ""
    echo "Next steps:"
    echo "1. Run: node test-supabase-connection.cjs"
    echo "2. Restart your dev server: npm run dev"
    echo "3. Try submitting a quote"
    exit 0
  elif [ "$response" -eq 521 ]; then
    echo "   Status: 521 (Still starting up...)"
  else
    echo "   Status: $response"
  fi
  
  if [ $count -lt $max_attempts ]; then
    sleep 30
  fi
done

echo ""
echo "⚠️  Project is taking longer than expected to start."
echo "   You may want to check the Supabase dashboard or create a new project."
