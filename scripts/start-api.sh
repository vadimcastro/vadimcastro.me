# scripts/start-api.sh
#!/bin/bash
set -e

echo "Starting API initialization..."

# Function for checking service availability
wait_for_service() {
    local host=$1
    local port=$2
    local service=$3
    
    echo "Waiting for $service..."
    while ! nc -z $host $port; do
        sleep 0.1
        echo -n "."
    done
    echo -e "\n$service started successfully!"
}

# Wait for required services
wait_for_service db 5432 "PostgreSQL"
wait_for_service redis 6379 "Redis"
wait_for_service minio 9000 "MinIO"

# Run migrations
echo "Running database migrations..."
alembic upgrade head
echo "Migrations completed successfully!"

# Start the application with environment-specific settings
if [ "$NODE_ENV" = "production" ]; then
    echo "Starting FastAPI application in production mode..."
    uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
else
    echo "Starting FastAPI application in development mode..."
    uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
fi