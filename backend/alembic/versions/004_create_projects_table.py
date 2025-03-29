# backend/alembic/versions/004_create_projects_table.py
"""create projects table

Revision ID: 004
Revises: 003
Create Date: 2024-01-29 00:00:00.000000
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import JSON

# revision identifiers, used by Alembic
revision = '004'
down_revision = '003'  # Points to user_sessions
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.create_table(
        'projects',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('slug', sa.String(), nullable=False),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('short_description', sa.Text(), nullable=False),
        sa.Column('long_description', sa.Text(), nullable=False),
        sa.Column('tech_stack', JSON, nullable=False),
        sa.Column('features', JSON, nullable=False),
        sa.Column('image_url', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), onupdate=sa.text('now()')),
        sa.PrimaryKeyConstraint('id')
    )
    
    # Add indexes
    op.create_index(op.f('ix_projects_slug'), 'projects', ['slug'], unique=True)
    op.create_index(op.f('ix_projects_title'), 'projects', ['title'])
    op.create_index(op.f('ix_projects_created_at'), 'projects', ['created_at'])

def downgrade() -> None:
    op.drop_index(op.f('ix_projects_created_at'))
    op.drop_index(op.f('ix_projects_title'))
    op.drop_index(op.f('ix_projects_slug'))
    op.drop_table('projects')