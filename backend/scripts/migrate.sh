# backend/scripts/migrate.sh
#!/bin/bash
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

# Skip Alembic for now and create tables directly (faster and more reliable)
echo "Creating tables directly for ultra-fast startup..."
python3 -c "
import sys
import os
sys.path.append('/app')

# Import models to register them with Base
from app.models.user import User
from app.models.project import Project  
from app.models.user_session import UserSession
from app.models.note import Note
from app.db.base_class import Base
from app.db.session import engine, SessionLocal
from sqlalchemy import text
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

print('Creating all tables...')
# Force table creation
Base.metadata.drop_all(bind=engine)  # Clean slate
Base.metadata.create_all(bind=engine)

# Test connection and ensure tables are visible
db = SessionLocal()
try:
    # List all tables to verify creation
    tables_result = db.execute(text(\"\"\"
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name
    \"\"\"))
    tables = [row[0] for row in tables_result]
    logger.info(f'Created tables: {tables}')
    
    # Verify the users table exists specifically
    if 'user' in tables or 'users' in tables:
        logger.info('Users table confirmed to exist')
    else:
        logger.error(f'Users table not found in: {tables}')
    
    db.commit()
finally:
    db.close()

print('Tables created successfully!')
"

# Initialize database with admin user
echo "Initializing database..."
python3 /app/scripts/init_db.py

echo "Migration complete!"