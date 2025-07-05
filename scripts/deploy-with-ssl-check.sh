#!/bin/bash

# Portfolio Deployment Script with SSL Handling
# This script provides options for deploying with or without custom domain

echo "🚀 OSFOLIO Deployment Script"
echo "=============================="

# Function to deploy with fallback configuration
deploy_fallback() {
    echo "📦 Building with fallback configuration..."
    
    # Backup original vercel.json
    cp vercel.json vercel.json.backup
    
    # Use fallback configuration
    cp vercel-fallback.json vercel.json
    
    # Build and deploy
    npm run build
    vercel --prod
    
    # Restore original configuration
    mv vercel.json.backup vercel.json
    
    echo "✅ Deployed with fallback configuration"
}

# Function to deploy with custom domain
deploy_custom() {
    echo "📦 Building with custom domain configuration..."
    npm run build
    vercel --prod
    echo "✅ Deployed with custom domain"
}

# Check for SSL certificate issues
echo "🔍 Checking SSL certificate status..."
if curl -s --connect-timeout 5 https://amaansyed27.tech > /dev/null 2>&1; then
    echo "✅ SSL certificate is valid"
    read -p "Deploy with custom domain? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        deploy_custom
    else
        deploy_fallback
    fi
else
    echo "⚠️  SSL certificate issue detected"
    echo "Deploying with fallback configuration..."
    deploy_fallback
fi

echo "🎉 Deployment complete!"
echo "💡 If you're experiencing SSL issues, contact your domain provider or Vercel support"
