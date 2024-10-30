# app/crud/crud_metrics.py
from sqlalchemy.orm import Session
from sqlalchemy import func, text
from fastapi_cache.decorator import cache

from datetime import datetime, timedelta
from typing import Dict
from app.models.user import User
from app.models.user_session import UserSession
from app.models.project import Project


def get_visitor_metrics(db: Session) -> Dict:
    """Get visitor metrics with month-over-month comparison"""
    current_month_start = datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    last_month_start = (current_month_start - timedelta(days=1)).replace(day=1)
    
    # Get current month's unique visitors using UserSession
    current_visitors = db.query(func.count(func.distinct(UserSession.user_id))).filter(
        UserSession.created_at >= current_month_start
    ).scalar() or 0
    
    # Get last month's unique visitors
    last_month_visitors = db.query(func.count(func.distinct(UserSession.user_id))).filter(
        UserSession.created_at >= last_month_start,
        UserSession.created_at < current_month_start
    ).scalar() or 0
    
    # Calculate percentage change
    percentage_change = (
        ((current_visitors - last_month_visitors) / last_month_visitors * 100)
        if last_month_visitors > 0 else 0
    )
    
    return {
        "total": current_visitors,
        "percentageChange": round(percentage_change, 1)
    }

def get_session_metrics(db: Session) -> Dict:
    """Get active session metrics with hourly comparison"""
    now = datetime.now()
    active_cutoff = now - timedelta(minutes=15)  # Consider sessions active within last 15 minutes
    previous_hour = now - timedelta(hours=1)
    
    # Get current active sessions
    active_sessions = db.query(func.count(func.distinct(UserSession.user_id))).filter(
        UserSession.last_activity >= active_cutoff
    ).scalar() or 0
    
    # Get active sessions from previous hour
    previous_hour_sessions = db.query(func.count(func.distinct(UserSession.user_id))).filter(
        UserSession.last_activity >= previous_hour,
        UserSession.last_activity < active_cutoff
    ).scalar() or 0
    
    # Calculate percentage change
    percentage_change = (
        ((active_sessions - previous_hour_sessions) / previous_hour_sessions * 100)
        if previous_hour_sessions > 0 else 0
    )
    
    return {
        "active": active_sessions,
        "percentageChange": round(percentage_change, 1)
    }

def get_user_metrics(db: Session) -> Dict:
    """Get user registration metrics"""
    current_month_start = datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    
    # Get total users
    total_users = db.query(func.count(User.id)).filter(
        User.is_active == True
    ).scalar() or 0
    
    # Get new users this month
    new_users = db.query(func.count(User.id)).filter(
        User.created_at >= current_month_start,
        User.is_active == True
    ).scalar() or 0
    
    return {
        "total": total_users,
        "newThisMonth": new_users
    }

def get_recent_activity(db: Session, limit: int = 5) -> list:
    """Get recent user activity"""
    # Get recent sessions
    recent_sessions = db.query(
        UserSession.user_id,
        User.username,
        UserSession.created_at
    ).join(
        User, User.id == UserSession.user_id
    ).order_by(
        UserSession.created_at.desc()
    ).limit(limit).all()
    
    # Format activities
    activities = []
    for session in recent_sessions:
        activities.append({
            "type": "session",
            "username": session.username,
            "timestamp": session.created_at,
            "description": f"User logged in"
        })
    
    return activities

def get_project_metrics(db: Session) -> Dict:
    """Get project metrics with month-over-month comparison"""
    current_month_start = datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    
    # Get total projects
    total_projects = db.query(Project).count()
    
    # Get new projects this month
    new_projects = db.query(Project).filter(
        Project.created_at >= current_month_start
    ).count()
    
    return {
        "total": total_projects,
        "newThisMonth": new_projects
    }