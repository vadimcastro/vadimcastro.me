# scripts/start-api.sh
#!/bin/bash
set -e

echo "Starting API initialization..."

# Wait for postgres
echo "Waiting for postgres..."
while ! nc -z db 5432; do
  sleep 0.1
  echo -n "."
done
echo -e "\nPostgreSQL started successfully!"

# Run migrations
echo "Running database migrations..."
alembic upgrade head
echo "Migrations completed successfully!"

# Start the application
echo "Starting FastAPI application..."
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload