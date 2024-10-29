# backend/scripts/run_migrations.py
import os
import sys
from alembic.config import Config
from alembic import command

def run_migrations():
    # Get the directory containing this script
    current_dir = os.path.dirname(os.path.abspath(__file__))
    # Get the project root directory (one level up)
    project_dir = os.path.dirname(current_dir)
    
    # Create Alembic configuration
    alembic_cfg = Config(os.path.join(project_dir, "alembic.ini"))
    
    # Set the script location
    alembic_cfg.set_main_option("script_location", os.path.join(project_dir, "alembic"))
    
    # Run the migration
    command.upgrade(alembic_cfg, "head")

if __name__ == "__main__":
    run_migrations()