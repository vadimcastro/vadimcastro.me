// src/components/dashboard/Notepad.tsx
'use client';

import { useState, useEffect } from 'react';
import { useProtectedApi } from '../../lib/api/protected';
import { Save, Loader2, Plus, FileText, Trash2, Maximize2, Minimize2, Edit3 } from 'lucide-react';

interface Note {
  id: number;
  title?: string;
  content: string;
  created_at: string;
  updated_at?: string;
}

export const Notepad = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('New Note');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const api = useProtectedApi();

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add Esc key handler for maximized view
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMaximized) {
        setIsMaximized(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMaximized]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const fetchedNotes = await api.get<Note[]>('/api/v1/notes/');
      setNotes(fetchedNotes);
      // Default to new note instead of latest
      setSelectedNote(null);
      setTitle('New Note');
      setContent('');
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveNote = async () => {
    setSaving(true);
    try {
      if (selectedNote) {
        // Update existing note
        const updatedNote = await api.put<Note>(`/api/v1/notes/${selectedNote.id}`, { 
          content,
          title: title !== 'New Note' ? title : undefined 
        });
        setNotes(notes.map(note => note.id === selectedNote.id ? updatedNote : note));
        setSelectedNote(updatedNote);
      } else {
        // Create new note
        const newNote = await api.post<Note>('/api/v1/notes/', { 
          content,
          title: title !== 'New Note' ? title : undefined 
        });
        setNotes([newNote, ...notes]);
        setSelectedNote(newNote);
        setTitle(newNote.title || getPreview(newNote.content));
      }
      setLastSaved(new Date());
    } catch (error) {
      console.error('Failed to save note:', error);
    } finally {
      setSaving(false);
    }
  };

  // Auto-save functionality
  useEffect(() => {
    if (!content.trim() && !title.trim()) return;
    
    const autoSaveTimer = setTimeout(() => {
      if (content.trim() || (title !== 'New Note' && title.trim())) {
        saveNote();
      }
    }, 2000); // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(autoSaveTimer);
  }, [content, title]);

  const createNewNote = () => {
    setSelectedNote(null);
    setTitle('New Note');
    setContent('');
  };

  const selectNote = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title || getPreview(note.content));
    setContent(note.content);
  };

  const deleteNote = async (noteId: number) => {
    try {
      await api.delete(`/api/v1/notes/${noteId}`);
      const updatedNotes = notes.filter(note => note.id !== noteId);
      setNotes(updatedNotes);
      
      if (selectedNote?.id === noteId) {
        // Always default to new note after deletion
        setSelectedNote(null);
        setTitle('New Note');
        setContent('');
      }
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      });
    } else if (diffInHours < 168) { // Less than a week
      return date.toLocaleDateString('en-US', {
        weekday: 'short'
      });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const getPreview = (content: string) => {
    return content.length > 40 ? content.substring(0, 40) + '...' : content || 'Empty note';
  };

  const getNoteDisplayTitle = (note: Note) => {
    return note.title || getPreview(note.content);
  };

  if (loading) {
    return (
      <section className={`${isMaximized ? 'fixed inset-0 z-50 h-screen' : 'h-[400px]'} border rounded-lg bg-white shadow-sm flex items-center justify-center`}>
        <Loader2 className="w-6 h-6 animate-spin" />
      </section>
    );
  }

  return (
    <section className={`${isMaximized ? 'fixed inset-0 z-50 h-screen' : 'h-[600px] md:h-[450px] max-w-full'} border rounded-lg bg-white shadow-sm overflow-hidden`}>
      <div className="h-full flex flex-col lg:flex-row min-w-0">
        {/* Notes List Sidebar - Hidden when maximized, stacked on mobile */}
        {!isMaximized && (
          <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col bg-gray-50 max-h-40 lg:max-h-none">
            <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-200 flex items-center justify-between">
              <Edit3 className="w-5 h-5 text-gray-700" />
              <button
                onClick={createNewNote}
                className="px-3 py-1.5 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors flex items-center gap-1.5"
                title="New Note"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              {notes.length === 0 ? (
                <div className="p-4 lg:p-6 text-center text-gray-500 text-sm">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p>No notes yet</p>
                  <p className="text-xs mt-1">Create your first note to get started</p>
                </div>
              ) : (
                <div className="flex lg:flex-col gap-2 lg:gap-0 px-2 lg:px-0 py-2 lg:py-0 overflow-x-auto lg:overflow-x-visible">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      onClick={() => selectNote(note)}
                      className={`p-3 lg:p-4 border lg:border-b lg:border-l-0 lg:border-r-0 lg:border-t-0 border-gray-200 rounded lg:rounded-none cursor-pointer hover:bg-white transition-colors flex-shrink-0 lg:flex-shrink min-w-[140px] lg:min-w-0 ${
                        selectedNote?.id === note.id ? 'bg-blue-50 lg:border-l-4 border-l-blue-500 shadow-sm lg:shadow-none' : 'bg-white lg:bg-transparent border-gray-300 lg:border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate leading-tight">
                            {getNoteDisplayTitle(note)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1.5">
                            {formatDate(note.created_at)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNote(note.id);
                          }}
                          className="ml-2 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete Note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Note Editor */}
        <div className={`flex-1 flex flex-col min-w-0 ${isMaximized ? 'bg-amber-50' : 'bg-gray-50'}`}>
          <div className={`px-3 lg:px-4 py-2 lg:py-3 border-b flex flex-col lg:flex-row lg:items-center justify-between gap-2 lg:gap-3 min-w-0 ${isMaximized ? 'border-amber-200 bg-amber-100' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <FileText className={`w-5 h-5 flex-shrink-0 hidden lg:block ${isMaximized ? 'text-amber-800' : 'text-gray-600'}`} />
              
              {/* Note title editor */}
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`text-lg lg:text-xl font-semibold bg-transparent border-none focus:outline-none focus:ring-0 px-0 w-full font-heading ${isMaximized ? 'text-amber-900' : 'text-gray-900'} ${title === 'New Note' ? 'lg:block hidden' : ''}`}
                  placeholder="Untitled Note"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between w-full gap-2 flex-shrink-0">
              {/* Quick note selector for mobile */}
              <select
                value={selectedNote?.id || ''}
                onChange={(e) => {
                  const noteId = parseInt(e.target.value);
                  const note = notes.find(n => n.id === noteId);
                  if (note) {
                    selectNote(note);
                  } else {
                    createNewNote();
                  }
                }}
                className={`lg:hidden text-sm border rounded px-2 py-1 focus:outline-none focus:ring-2 min-w-[110px] ${isMaximized ? 'border-amber-300 bg-amber-50 text-amber-800 focus:ring-amber-500' : 'border-gray-300 bg-white text-gray-800 focus:ring-blue-500'}`}
              >
                <option value="">New Note</option>
                {notes.map((note) => (
                  <option key={note.id} value={note.id}>
                    {getNoteDisplayTitle(note)}
                  </option>
                ))}
              </select>
              
              <div className="flex items-center gap-2">
                {/* Auto-saved timer */}
                {lastSaved && (
                  <span className={`text-xs hidden lg:inline px-2 py-1 rounded-full ${isMaximized ? 'text-amber-600 bg-amber-100' : 'text-gray-500 bg-gray-100'}`}>
                    Auto-saved: {lastSaved.toLocaleTimeString()}
                  </span>
                )}

                {/* New Note button for maximized view */}
                {isMaximized && (
                  <button
                    onClick={createNewNote}
                    className="px-2 py-1 bg-green-700 text-white rounded text-sm hover:bg-green-800 transition-colors hidden lg:flex items-center gap-1"
                    title="New Note"
                  >
                    <Plus className="w-3.5 h-3.5 hidden lg:inline" />
                    <span className="hidden lg:inline">New</span>
                  </button>
                )}

                {/* Delete button - only show when note has content */}
                {selectedNote && (content.trim() || title !== 'New Note') && (
                  <button
                    onClick={() => deleteNote(selectedNote.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors flex items-center gap-1"
                    title="Delete Note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden lg:inline">Delete</span>
                  </button>
                )}

                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className={`px-2 py-1 text-white rounded text-sm transition-colors flex items-center gap-1 ${isMaximized ? 'bg-amber-600 hover:bg-amber-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                  title={isMaximized ? 'Exit Focus Mode' : 'Enter Focus Mode'}
                >
                  {isMaximized ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5" />
                      <span className="hidden lg:inline">Exit Focus</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="hidden lg:inline">Focus Mode</span>
                    </>
                  )}
                </button>

                <button
                  onClick={saveNote}
                  disabled={saving || (!content.trim() && title === 'New Note')}
                  className={`px-2 py-1 text-white rounded text-sm transition-colors flex items-center gap-1 disabled:opacity-50 ${isMaximized ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                {saving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span className="hidden lg:inline">Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span className="hidden lg:inline">Save</span>
                  </>
                )}
              </button>
              </div>
            </div>
          </div>
          
          <div className={`flex-1 ${isMaximized ? 'p-4 lg:p-8' : 'p-2 lg:p-3'} ${isMaximized ? 'bg-amber-50' : 'bg-gray-100'}`}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full h-full p-3 lg:p-4 rounded-lg resize-none focus:outline-none focus:ring-2 text-base leading-relaxed ${
                isMaximized 
                  ? 'border border-amber-200 bg-amber-50 text-amber-950 placeholder-amber-400 focus:ring-amber-500 focus:border-amber-500 lg:text-lg shadow-inner' 
                  : 'border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 focus:bg-white'
              }`}
              placeholder="Start writing your thoughts..."
            />
          </div>
        </div>
      </div>
    </section>
  );
};