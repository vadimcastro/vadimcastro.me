# backend/scripts/migrate.sh
#!/bin/bash
cd /app

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

db_name = os.getenv('POSTGRES_DB', 'vadimcastro-me')

try:
    # Connect to postgres default database
    conn = psycopg2.connect(**db_params, database='postgres')
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()
    
    # Check if database exists
    cursor.execute(\"SELECT 1 FROM pg_database WHERE datname='%s'\" % db_name)
    exists = cursor.fetchone()
    
    if not exists:
        print(f'Creating database {db_name}...')
        cursor.execute(f'CREATE DATABASE {db_name}')
        print(f'Database {db_name} created successfully!')
    else:
        print(f'Database {db_name} already exists')
    
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f'Database creation error: {e}')
    # Continue anyway, might be a connection issue
"

# Check if alembic directory and env.py exist
if [ ! -d "alembic" ] || [ ! -f "alembic/env.py" ]; then
    echo "Alembic not properly configured, creating tables directly..."
    python3 -c "
import sys
import os
sys.path.append('/app')

# Import models to register them with Base
from app.models.user import User
from app.models.project import Project  
from app.models.user_session import UserSession
from app.db.base_class import Base
from app.db.session import engine, SessionLocal
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
    tables_result = db.execute(\"\"\"
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name
    \"\"\")
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
    echo "Migration complete!"
    exit 0
fi

# Function to check if a migration has been applied
check_migration() {
    local revision=$1
    alembic history | grep -q $revision
}

# Get current revision
echo "Checking current migration state..."
current=$(alembic current 2>/dev/null || echo "None")
echo "Current revision: $current"

if [ "$current" = "None" ]; then
    echo "No migrations found. Running all migrations..."
    alembic upgrade head
elif [ "$current" = "001" ]; then
    echo "At revision 001. Running remaining migrations..."
    alembic upgrade head
elif [ "$current" = "002" ]; then
    echo "At revision 002. Running remaining migrations..."
    alembic upgrade head
else
    echo "Ensuring we're at the latest migration..."
    alembic upgrade head
fi

echo "Migration complete!"