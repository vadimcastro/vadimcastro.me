#!/bin/bash
# scripts/build-base-images.sh
# Build optimized base images for vadimcastro.me

set -e

PROJECT_SLUG="${PROJECT_SLUG:-vpt-core}"
FRONTEND_IMAGE="${PROJECT_SLUG}-frontend-base:latest"
BACKEND_IMAGE="${PROJECT_SLUG}-backend-base:latest"

echo "🏗️ Building shared base images for ultra-fast startup..."

# Build frontend base image
echo "📦 Building ${FRONTEND_IMAGE}..."
docker build -t "${FRONTEND_IMAGE}" -f docker/base/Dockerfile.frontend.base .

# Build backend base image
echo "📦 Building ${BACKEND_IMAGE}..."
docker build -t "${BACKEND_IMAGE}" -f docker/base/Dockerfile.backend.base .

echo "✅ Base images built successfully!"
echo "💡 Use 'make dev-ultra' for lightning-fast startup"

# Show image sizes
echo "📊 Image sizes:"
docker images | grep "${PROJECT_SLUG}-.*-base" || true
