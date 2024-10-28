# scripts/start-dev.sh
#!/bin/bash
set -e

echo "Starting development environment..."

# Ensure we're in the right directory
cd "$(dirname "$0")/.."

# Start services with development configuration
cd docker
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
