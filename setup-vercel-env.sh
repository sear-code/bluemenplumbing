#!/bin/bash

# Setup Vercel Environment Variables
# This script will add all required environment variables to your Vercel project

echo "🚀 Setting up Vercel environment variables..."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "🔗 Linking to Vercel project..."
vercel link

echo ""
echo "📝 Adding environment variables..."
echo ""

# Supabase Configuration
echo "Adding NEXT_PUBLIC_SUPABASE_URL..."
echo "https://elqkduzhcjsgsoksastu.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL production preview development

echo "Adding NEXT_PUBLIC_SUPABASE_ANON_KEY..."
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVscWtkdXpoY2pzZ3Nva3Nhc3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3NzUwMjcsImV4cCI6MjA4MzM1MTAyN30.c7p4OIcerriPBg7Ca0LUOzuvLHwV9D4OuGEi5vbmw9c" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production preview development

# Resend Email Configuration
echo "Adding RESEND_API_KEY..."
echo "re_HPs1rq82_HJNUrQyXLzfbHEiEGgrFNsh3" | vercel env add RESEND_API_KEY production preview development

echo "Adding RESEND_FROM_EMAIL..."
echo "onboarding@resend.dev" | vercel env add RESEND_FROM_EMAIL production preview development

echo "Adding RESEND_TO_EMAIL..."
echo "searahmad22@gmail.com" | vercel env add RESEND_TO_EMAIL production preview development

# Google Places API Configuration (You'll need to add these manually if you haven't already)
echo ""
echo "⚠️  IMPORTANT: Add Google Places API variables manually:"
echo "   Run these commands with your actual values:"
echo ""
echo "   vercel env add NEXT_PUBLIC_GOOGLE_PLACES_API_KEY production preview development"
echo "   vercel env add NEXT_PUBLIC_GOOGLE_PLACE_ID production preview development"
echo ""

echo "✅ Environment variables added successfully!"
echo ""
echo "🔄 Now redeploying your project..."
vercel --prod

echo ""
echo "✨ Done! Your project should now build successfully."
