# app/middleware/session_tracking.py
from fastapi import Request
from app.db.session import SessionLocal
from app.models.user_session import UserSession
from datetime import datetime

async def track_user_session(request: Request, call_next):
    response = await call_next(request)
    
    if request.user:  # Assuming you have user information in request
        db = SessionLocal()
        try:
            session = db.query(UserSession).filter(
                UserSession.user_id == request.user.id
            ).first()
            
            if not session:
                session = UserSession(user_id=request.user.id)
                db.add(session)
            else:
                session.last_activity = datetime.now()
            
            db.commit()
        finally:
            db.close()
    
    return response