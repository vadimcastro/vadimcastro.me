# alembic/versions/002_remove_avatar_field.py
"""remove avatar field

Revision ID: 002
Revises: previous_revision_id
Create Date: 2024-10-29

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '002'
down_revision = '001' # create users table
branch_labels = None
depends_on = None

def upgrade():
    # Remove the avatar column if it doesn't exist
    try:
        op.drop_column('users', 'avatar')
    except Exception as e:
        pass  # Column might not exist

def downgrade():
    # Add back the avatar column if needed
    op.add_column('users', sa.Column('avatar', sa.String(), nullable=True))