# backend/alembic/versions/005_create_notes_table.py
"""create notes table

Revision ID: 005
Revises: 004
Create Date: 2024-01-29 00:00:00.000000
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic
revision = '005'
down_revision = '004'  # Points to projects table
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.create_table(
        'notes',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('content', sa.Text(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), onupdate=sa.text('now()')),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE')
    )
    
    # Add indexes
    op.create_index('ix_notes_user_id', 'notes', ['user_id'])
    op.create_index('ix_notes_created_at', 'notes', ['created_at'])

def downgrade() -> None:
    op.drop_index('ix_notes_created_at')
    op.drop_index('ix_notes_user_id')
    op.drop_table('notes')