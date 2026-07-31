#!/bin/bash
# scripts/build-base-images.sh
# Build optimized base images for vadimcastro.com

echo "🏗️ Building vadimcastro.com base images for ultra-fast startup..."

# Build frontend base image with vadimcastro.com-specific dependencies
echo "📦 Building vadimcastro-com-frontend-base..."
docker build -t vadimcastro-com-frontend-base:latest -f docker/base/Dockerfile.frontend.base .

# Build backend base image with vadimcastro.com-specific dependencies  
echo "📦 Building vadimcastro-com-backend-base..."
docker build -t vadimcastro-com-backend-base:latest -f docker/base/Dockerfile.backend.base .

echo "✅ vadimcastro.com base images built successfully!"
echo "💡 Use 'make dev-ultra' for lightning-fast startup"

# Show image sizes
echo "📊 Image sizes:"
docker images | grep "vadimcastro-com-.*-base"