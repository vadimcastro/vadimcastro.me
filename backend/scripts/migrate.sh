# backend/scripts/migrate.sh
#!/bin/bash
cd /app

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