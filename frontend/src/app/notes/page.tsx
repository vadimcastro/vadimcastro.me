// src/app/notes/page.tsx
'use client';

import React, { useEffect, useState, useOptimistic, useTransition } from 'react';
import { Cloud, Plus, Trash2, Save, FileText, Check, Loader2, Lock, Zap } from 'lucide-react';
import { useAuth } from '../../lib/auth/AuthContext';
import Cookies from 'js-cookie';

interface Note {
  id: number;
  title: string | null;
  content: string;
  created_at: string;
  updated_at?: string;
}

export default function NotesPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [isPending, startTransition] = useTransition();

  // React 19 Optimistic UI State
  const [optimisticNotes, setOptimisticNotes] = useOptimistic(
    notes,
    (
      currentNotes: Note[],
      action: { type: 'add' | 'update' | 'delete'; note?: Note; id?: number }
    ) => {
      if (action.type === 'add' && action.note) {
        return [action.note, ...currentNotes];
      }
      if (action.type === 'update' && action.note) {
        return currentNotes.map((n) => (n.id === action.note!.id ? { ...n, ...action.note } : n));
      }
      if (action.type === 'delete' && action.id !== undefined) {
        return currentNotes.filter((n) => n.id !== action.id);
      }
      return currentNotes;
    }
  );

  const token = Cookies.get('accessToken');

  const fetchNotes = async () => {
    if (!token) return;
    try {
      setLoadingNotes(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/notes/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      if (res.ok) {
        const data: Note[] = await res.json();
        setNotes(data);
        if (data.length > 0 && !selectedNote) {
          setSelectedNote(data[0]);
          setTitle(data[0].title || '');
          setContent(data[0].content || '');
        }
      }
    } catch (err) {
      console.error('Error fetching notes:', err);
    } finally {
      setLoadingNotes(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotes();
    } else {
      setLoadingNotes(false);
    }
  }, [isAuthenticated, token]);

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title || '');
    setContent(note.content || '');
    setSavedSuccess(false);
  };

  const handleCreateNote = async () => {
    if (!token) return;
    
    // React 19 Optimistic Insert
    const tempId = Date.now();
    const tempNote: Note = {
      id: tempId,
      title: 'New Cloud Note',
      content: '',
      created_at: new Date().toISOString(),
    };

    startTransition(() => {
      setOptimisticNotes({ type: 'add', note: tempNote });
      setSelectedNote(tempNote);
      setTitle(tempNote.title || '');
      setContent('');
    });

    try {
      setSaving(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/notes/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: 'New Cloud Note', content: '' }),
      });
      if (res.ok) {
        const newNote: Note = await res.json();
        setNotes((prev) => [newNote, ...prev]);
        setSelectedNote(newNote);
      } else {
        // Rollback on failure
        fetchNotes();
      }
    } catch (err) {
      console.error('Error creating note:', err);
      fetchNotes();
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNote = async () => {
    if (!selectedNote || !token) return;
    
    const updatedNote: Note = {
      ...selectedNote,
      title,
      content,
      updated_at: new Date().toISOString(),
    };

    // React 19 Optimistic Update (0ms UI latency)
    startTransition(() => {
      setOptimisticNotes({ type: 'update', note: updatedNote });
    });

    try {
      setSaving(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/notes/${selectedNote.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        const updated: Note = await res.json();
        setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
        setSelectedNote(updated);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2500);
      } else {
        fetchNotes();
      }
    } catch (err) {
      console.error('Error saving note:', err);
      fetchNotes();
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteNote = async (id: number) => {
    if (!token) return;

    // React 19 Optimistic Delete
    startTransition(() => {
      setOptimisticNotes({ type: 'delete', id });
      if (selectedNote?.id === id) {
        const remaining = optimisticNotes.filter((n) => n.id !== id);
        if (remaining.length > 0) {
          handleSelectNote(remaining[0]);
        } else {
          setSelectedNote(null);
          setTitle('');
          setContent('');
        }
      }
    });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setNotes((prev) => prev.filter((n) => n.id !== id));
      } else {
        fetchNotes();
      }
    } catch (err) {
      console.error('Error deleting note:', err);
      fetchNotes();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto">
          <Lock className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-white">Personal Cloud Storage</h2>
          <p className="text-sm text-slate-400">
            Please sign in using the profile account trigger in the header to access your synced personal cloud document notes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">Personal Cloud Storage & Notes</h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-extrabold border border-cyan-500/30">
                <Zap className="w-3 h-3 fill-cyan-400" /> React 19 Optimistic UI
              </span>
            </div>
            <p className="text-xs text-slate-400">Synced to PostgreSQL database with 0ms local perceived latency</p>
          </div>
        </div>

        <button
          onClick={handleCreateNote}
          className="flex items-center gap-1.5 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-cyan-500/20"
          disabled={saving}
        >
          <Plus className="w-4 h-4" />
          <span>New Note</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[650px]">
        {/* Sidebar Notes List with Optimistic UI */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 overflow-y-auto space-y-2">
          {loadingNotes ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
            </div>
          ) : optimisticNotes.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-8">No notes stored yet. Create one!</p>
          ) : (
            optimisticNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => handleSelectNote(note)}
                className={`p-3 rounded-xl cursor-pointer transition-all border ${
                  selectedNote?.id === note.id
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-white'
                    : 'bg-slate-950/40 border-slate-800/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="truncate pr-2">
                    <p className="text-sm font-semibold truncate">{note.title || 'Untitled Note'}</p>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {note.content ? note.content.slice(0, 45) : 'Empty note...'}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNote(note.id);
                    }}
                    className="text-slate-400 hover:text-rose-400 p-1 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Note Editor Area */}
        <div className="md:col-span-2 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          {selectedNote ? (
            <>
              <div className="space-y-4 flex-1 flex flex-col">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Note Title..."
                  className="w-full text-xl font-bold bg-transparent text-white border-b border-slate-800 pb-2 focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your personal cloud document notes here..."
                  className="flex-1 w-full bg-slate-950/50 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 resize-none font-mono leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
                <span className="text-xs text-slate-400">
                  {savedSuccess ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                      <Check className="w-3.5 h-3.5" /> Synced to PostgreSQL
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-cyan-400 font-medium">
                      <Zap className="w-3 h-3 fill-cyan-400" /> React 19 Optimistic Active
                    </span>
                  )}
                </span>

                <button
                  onClick={handleSaveNote}
                  disabled={saving}
                  className="flex items-center gap-1.5 px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-cyan-500/20 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-2">
              <FileText className="w-10 h-10 text-slate-400 stroke-1" />
              <p className="text-sm">Select a note from the sidebar or create a new one.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
