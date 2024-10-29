# app/crud/crud_metrics.py
from sqlalchemy.orm import Session
from sqlalchemy import func, text
from datetime import datetime, timedelta
from app.models.project import Project
from app.models.user import User
# Add any other required models

def get_visitor_metrics(db: Session):
    # This is a placeholder - implement based on your analytics tracking
    current_month = datetime.now().replace(day=1)
    last_month = current_month - timedelta(days=1)
    
    current_visitors = db.execute(
        text("""
        SELECT COUNT(DISTINCT user_id) 
        FROM user_sessions 
        WHERE created_at >= :start_date
        """),
        {"start_date": current_month}
    ).scalar() or 0
    
    last_month_visitors = db.execute(
        text("""
        SELECT COUNT(DISTINCT user_id) 
        FROM user_sessions 
        WHERE created_at >= :start_date AND created_at < :end_date
        """),
        {"start_date": last_month, "end_date": current_month}
    ).scalar() or 0
    
    percentage_change = (
        ((current_visitors - last_month_visitors) / last_month_visitors * 100)
        if last_month_visitors > 0 else 0
    )
    
    return {
        "total": current_visitors,
        "percentageChange": percentage_change
    }

def get_project_metrics(db: Session):
    total_projects = db.query(Project).count()
    new_projects = db.query(Project).filter(
        Project.created_at >= datetime.now().replace(day=1)
    ).count()
    
    return {
        "total": total_projects,
        "newThisMonth": new_projects
    }

def get_session_metrics(db: Session):
    # Assuming you're tracking active sessions in your database
    active_sessions = db.execute(
        text("""
        SELECT COUNT(DISTINCT user_id) 
        FROM user_sessions 
        WHERE last_activity >= :cutoff
        """),
        {"cutoff": datetime.now() - timedelta(minutes=15)}
    ).scalar() or 0
    
    # Calculate percentage change from last hour
    last_hour = db.execute(
        text("""
        SELECT COUNT(DISTINCT user_id) 
        FROM user_sessions 
        WHERE last_activity >= :start AND last_activity < :end
        """),
        {
            "start": datetime.now() - timedelta(hours=2),
            "end": datetime.now() - timedelta(hours=1)
        }
    ).scalar() or 0
    
    percentage_change = (
        ((active_sessions - last_hour) / last_hour * 100)
        if last_hour > 0 else 0
    )
    
    return {
        "active": active_sessions,
        "percentageChange": percentage_change
    }