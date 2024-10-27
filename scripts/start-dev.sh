# scripts/start-dev.sh
#!/bin/bash
set -e

# Start all services in development mode
cd docker
docker-compose down -v
docker-compose up --build