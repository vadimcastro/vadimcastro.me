#!/bin/bash
# backend/scripts/migrate.sh
cd /app
export PYTHONPATH=/app

# Ensure the database exists first
echo "Ensuring database exists..."
python3 -c "
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import os

# Database connection parameters
db_params = {
    'host': os.getenv('POSTGRES_HOST', 'db'),
    'port': int(os.getenv('POSTGRES_PORT', '5432')),
    'user': os.getenv('POSTGRES_USER', 'postgres'),
    'password': os.getenv('POSTGRES_PASSWORD', 'password'),
}

db_name = os.getenv('POSTGRES_DB', 'vadimcastrome')
print(f'Target database name from environment: {db_name}')

try:
    # Connect to postgres default database
    conn = psycopg2.connect(**db_params, database='postgres')
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()
    
    # Check if database exists  
    cursor.execute(\"SELECT 1 FROM pg_database WHERE datname=%s\", (db_name,))
    exists = cursor.fetchone()
    
    if not exists:
        print(f'Creating database {db_name}...')
        # Database names cannot be parameterized, but we validate the name first
        if db_name.replace('_', '').replace('-', '').isalnum():
            cursor.execute(f'CREATE DATABASE \"{db_name}\"')
            print(f'Database {db_name} created successfully!')
        else:
            print(f'Invalid database name: {db_name}')
    else:
        print(f'Database {db_name} already exists')
    
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f'Database creation error: {e}')
    # Continue anyway, might be a connection issue
"

# Run migrations via Alembic
echo "Running database migrations with Alembic..."
cd /app
export PYTHONPATH=/app
python3 -m alembic upgrade head

# Initialize database with admin user
echo "Initializing database..."
python3 /app/scripts/init_db.py

echo "Migration complete!"
