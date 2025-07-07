#!/bin/bash
# scripts/build-base-images.sh
# Build optimized base images for vadimcastro.me

echo "🏗️ Building vc-resume base images for ultra-fast startup..."

# Build frontend base image with vadimcastro.me-specific dependencies
echo "📦 Building vc-resume-frontend-base..."
docker build -t vc-resume-frontend-base:latest -f docker/base/Dockerfile.frontend.base .

# Build backend base image with vadimcastro.me-specific dependencies  
echo "📦 Building vc-resume-backend-base..."
docker build -t vc-resume-backend-base:latest -f docker/base/Dockerfile.backend.base .

echo "✅ vadimcastro.me base images built successfully!"
echo "💡 Use 'make dev-ultra' for lightning-fast startup"

# Show image sizes
echo "📊 Image sizes:"
docker images | grep "vc-resume-.*-base"