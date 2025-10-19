#!/bin/bash

echo "🚀 Starting SparkLab 2025 Frontend..."
echo "📁 Navigating to frontend directory..."

cd "$(dirname "$0")/frontend"

echo "📍 Current directory: $(pwd)"
echo "✅ Checking package.json exists..."

if [ -f "package.json" ]; then
    echo "✅ package.json found"
    echo "📦 Installing dependencies..."
    npm install
    echo "🏃‍♂️ Starting development server..."
    npm run dev
else
    echo "❌ package.json not found!"
    echo "📁 Directory contents:"
    ls -la
fi