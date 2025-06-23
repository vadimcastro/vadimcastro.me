"""add title to notes

Revision ID: 006
Revises: 005
Create Date: 2025-06-23 01:30:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '006'
down_revision = '005'
branch_labels = None
depends_on = None


def upgrade():
    # Add title column to notes table
    op.add_column('notes', sa.Column('title', sa.Text(), nullable=True))


def downgrade():
    # Remove title column from notes table
    op.drop_column('notes', 'title')