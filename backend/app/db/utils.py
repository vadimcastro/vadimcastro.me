# app/db/utils.py
from sqlalchemy.sql import text
from app.db.session import engine

def test_db_connection():
    """Test database connection"""
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
            print("Database connection successful!")
        return True
    except Exception as e:
        print(f"Database connection failed: {e}")
        return False