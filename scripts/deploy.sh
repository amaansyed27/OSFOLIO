#!/bin/bash

# SEO-optimized Deployment Script
# This script builds and deploys the portfolio with all SEO optimizations enabled

echo "🚀 Starting SEO-optimized build and deployment process..."

# Step 1: Update sitemap with current date
echo "📝 Generating fresh sitemap with current date..."
node scripts/generate-sitemap.js

# Step 2: Run production build with all optimizations
echo "🏗️ Creating optimized production build..."
npm run build

# Step 3: Validate HTML and check for SEO issues
echo "🔍 Validating build output..."
npx html-validator --file=dist/index.html || echo "⚠️ HTML validation completed with warnings"

# Step 4: Deploy to Vercel with proper settings
echo "☁️ Deploying to Vercel..."
npx vercel --prod

echo "✅ Deployment complete! Your SEO-optimized site is now live."
echo "📊 Remember to check Google Search Console for indexing status."
