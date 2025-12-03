#!/bin/bash

# GreenRoot Quick Deployment Script
# This script helps you deploy GreenRoot to Render

echo "🌱 GreenRoot Deployment Helper"
echo "================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit for deployment"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

echo ""
echo "📋 Pre-deployment Checklist:"
echo ""
echo "1. Create a GitHub repository"
echo "2. Push your code:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/greenroot.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Sign up for Render: https://render.com"
echo ""
echo "4. Deploy services in this order:"
echo "   a. Database (MySQL/PostgreSQL)"
echo "   b. Backend API"
echo "   c. AI Service"
echo "   d. Frontend"
echo ""
echo "📝 Important Environment Variables:"
echo ""
echo "Backend:"
echo "  - DATABASE_URL (from your database service)"
echo "  - JWT_SECRET (generate with: openssl rand -base64 32)"
echo "  - AI_SERVICE_URL (your AI service URL)"
echo "  - ALLOWED_ORIGINS (your frontend URL)"
echo ""
echo "Frontend:"
echo "  - VITE_API_URL (your backend URL)"
echo ""
echo "🔗 Useful Commands:"
echo ""
echo "Generate JWT Secret:"
echo "  openssl rand -base64 32"
echo ""
echo "Test Backend Locally:"
echo "  cd backend && npm run dev"
echo ""
echo "Test AI Service Locally:"
echo "  cd ai-service && python app.py"
echo ""
echo "Test Frontend Locally:"
echo "  cd frontend && npm run dev"
echo ""
echo "Build Frontend for Production:"
echo "  cd frontend && npm run build"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "Good luck with your deployment! 🚀"
