#!/bin/bash

# Setup Vercel Environment Variables
# This script will add all required environment variables to your Vercel project

set -e  # Exit on error

echo "🚀 Setting up Vercel environment variables..."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo "📝 Please login to Vercel:"
    vercel login
fi

echo ""
echo "📝 Adding environment variables..."
echo ""

# Function to add env var
add_env_var() {
    local name=$1
    local value=$2
    echo "Adding $name..."
    echo "$value" | vercel env add "$name" production preview development --force 2>/dev/null || echo "✓ $name already exists or added"
}

# Supabase Configuration
add_env_var "NEXT_PUBLIC_SUPABASE_URL" "https://elqkduzhcjsgsoksastu.supabase.co"
add_env_var "NEXT_PUBLIC_SUPABASE_ANON_KEY" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVscWtkdXpoY2pzZ3Nva3Nhc3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3NzUwMjcsImV4cCI6MjA4MzM1MTAyN30.c7p4OIcerriPBg7Ca0LUOzuvLHwV9D4OuGEi5vbmw9c"

# Resend Email Configuration
add_env_var "RESEND_API_KEY" "re_HPs1rq82_HJNUrQyXLzfbHEiEGgrFNsh3"
add_env_var "RESEND_FROM_EMAIL" "onboarding@resend.dev"
add_env_var "RESEND_TO_EMAIL" "searahmad22@gmail.com"

echo ""
echo "✅ Environment variables added successfully!"
echo ""
echo "🔄 Triggering a new deployment..."
echo "   Go to: https://vercel.com/sear-codes-projects/bluemenplumbing"
echo "   Or run: vercel --prod"
echo ""
echo "✨ Done!"
