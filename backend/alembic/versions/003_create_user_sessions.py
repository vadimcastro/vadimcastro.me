# backend/alembic/versions/003_create_user_sessions.py
"""create user sessions table

Revision ID: 003
Revises: 002
Create Date: 2024-01-29 00:00:00.000000
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic
revision = '003'
down_revision = '002'  # Points to remove_avatar_field
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.create_table(
        'user_sessions',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('last_activity', sa.DateTime(timezone=True), server_default=sa.text('now()'), onupdate=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    
    # Add indexes for faster queries
    op.create_index(
        'ix_user_sessions_user_id',
        'user_sessions',
        ['user_id']
    )
    op.create_index(
        'ix_user_sessions_created_at',
        'user_sessions',
        ['created_at']
    )
    op.create_index(
        'ix_user_sessions_last_activity',
        'user_sessions',
        ['last_activity']
    )

def downgrade() -> None:
    op.drop_index('ix_user_sessions_last_activity')
    op.drop_index('ix_user_sessions_created_at')
    op.drop_index('ix_user_sessions_user_id')
    op.drop_table('user_sessions')