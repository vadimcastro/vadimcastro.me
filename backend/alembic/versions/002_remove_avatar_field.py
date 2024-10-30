# backend/alembic/versions/002_remove_avatar_field.py
"""remove avatar field

Revision ID: 002
Revises: 001
Create Date: 2024-01-29 00:00:00.000000
"""
from alembic import op
import sqlalchemy as sa

revision = '002'
down_revision = '001'  # Points to create_users_table
branch_labels = None
depends_on = None

def upgrade() -> None:
    # Use op.get_bind to check if column exists before trying to drop it
    conn = op.get_bind()
    inspector = sa.inspect(conn)
    columns = inspector.get_columns('users')
    if any(col['name'] == 'avatar' for col in columns):
        op.drop_column('users', 'avatar')

def downgrade() -> None:
    op.add_column('users', sa.Column('avatar', sa.String(), nullable=True))