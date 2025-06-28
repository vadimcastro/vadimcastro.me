# backend/scripts/migrate.sh
#!/bin/bash
cd /app

# Check if alembic directory and env.py exist
if [ ! -d "alembic" ] || [ ! -f "alembic/env.py" ]; then
    echo "Alembic not properly configured, creating tables directly..."
    python3 -c "
from app.db.base import Base
from app.db.session import engine, SessionLocal
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

print('Creating all tables...')
Base.metadata.create_all(bind=engine)

# Test connection and ensure tables are visible
db = SessionLocal()
try:
    # Check if we can query the metadata
    result = db.execute('SELECT 1')
    logger.info('Database connection successful')
    
    # List all tables to verify creation
    tables_result = db.execute(\"\"\"
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
    \"\"\")
    tables = [row[0] for row in tables_result]
    logger.info(f'Created tables: {tables}')
    
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