# app/services/analytics.py
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.interaction import AnalyticsInteraction
from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta

class AnalyticsService:
    @staticmethod
    def track_interaction(
        db: Session, 
        interaction_type: str, 
        target_id: str, 
        metadata: Optional[Dict[str, Any]] = None
    ) -> AnalyticsInteraction:
        """Create a new interaction record"""
        db_interaction = AnalyticsInteraction(
            interaction_type=interaction_type,
            target_id=target_id,
            metadata_json=metadata
        )
        db.add(db_interaction)
        db.commit()
        db.refresh(db_interaction)
        return db_interaction

    @staticmethod
    def get_interaction_stats(db: Session, days: int = 30) -> List[Dict[str, Any]]:
        """Get summarized stats for the last N days"""
        since_date = datetime.now() - timedelta(days=days)
        
        # Group by type and target
        stats = db.query(
            AnalyticsInteraction.interaction_type,
            AnalyticsInteraction.target_id,
            func.count(AnalyticsInteraction.id).label("count")
        ).filter(
            AnalyticsInteraction.timestamp >= since_date
        ).group_by(
            AnalyticsInteraction.interaction_type,
            AnalyticsInteraction.target_id
        ).all()
        
        return [
            {
                "type": s.interaction_type,
                "target": s.target_id,
                "count": s.count
            } for s in stats
        ]

    @staticmethod
    def get_total_counts(db: Session) -> Dict[str, int]:
        """Get total counts per type"""
        stats = db.query(
            AnalyticsInteraction.interaction_type,
            func.count(AnalyticsInteraction.id).label("count")
        ).group_by(
            AnalyticsInteraction.interaction_type
        ).all()
        
        return {s.interaction_type: s.count for s in stats}
