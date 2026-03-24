# app/api/v1/endpoints/notes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.api.deps import get_db, get_current_active_user
from app.models.user import User
from app.models.note import Note
from app.schemas.note import NoteCreate, Note as NoteSchema

router = APIRouter()

@router.post("/", response_model=NoteSchema)
async def create_note(
    note_in: NoteCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    note = Note(user_id=current_user.id, title=note_in.title, content=note_in.content)
    db.add(note)
    db.commit()
    db.refresh(note)
    return note

@router.get("/", response_model=List[NoteSchema])
async def get_notes(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    notes = db.query(Note).filter(
        Note.user_id == current_user.id
    ).order_by(Note.created_at.desc()).all()
    return notes

@router.get("/latest", response_model=NoteSchema)
async def get_latest_note(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    note = db.query(Note).filter(
        Note.user_id == current_user.id
    ).order_by(Note.created_at.desc()).first()
    
    if not note:
        note = Note(user_id=current_user.id, title="Welcome", content="Start typing...")
        db.add(note)
        db.commit()
        db.refresh(note)
    return note

@router.put("/{note_id}", response_model=NoteSchema)
async def update_note(
    note_id: int,
    note_in: NoteCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    note = db.query(Note).filter(
        Note.id == note_id,
        Note.user_id == current_user.id
    ).first()
    
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
        
    note.title = note_in.title
    note.content = note_in.content
    db.commit()
    db.refresh(note)
    return note

@router.delete("/{note_id}")
async def delete_note(
    note_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    note = db.query(Note).filter(
        Note.id == note_id,
        Note.user_id == current_user.id
    ).first()
    
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
        
    db.delete(note)
    db.commit()
    return {"message": "Note deleted successfully"}
