// src/components/dashboard/NotepadRefactored.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useProtectedApi } from '../../lib/api/protected';
import { Save, Loader2, Plus, FileText, Trash2, Maximize2, Minimize2, Edit3, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { MobileActionMenu, type MobileAction } from '../ui/MobileActionMenu';

interface Note {
  id: number;
  title?: string;
  content: string;
  created_at: string;
  updated_at?: string;
}

export const NotepadRefactored = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('New Note');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showNoteSelector, setShowNoteSelector] = useState(false);
  const [showMobileActions, setShowMobileActions] = useState(false);
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);
  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notepadSectionRef = useRef<HTMLElement>(null);
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

  // Auto-hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNoteSelector(false);
      }
    };

    if (showNoteSelector) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNoteSelector]);

  // Auto-resize title textarea when title changes
  useEffect(() => {
    if (titleTextareaRef.current) {
      const textarea = titleTextareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [title]);

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

  const handleExitMaximized = () => {
    setIsMaximized(false);
    // Focus and scroll to notepad section after exiting
    setTimeout(() => {
      // First scroll to the notepad section
      notepadSectionRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      // Then focus on the content textarea
      setTimeout(() => {
        contentTextareaRef.current?.focus();
      }, 100);
    }, 300);
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

  // Define mobile actions based on current state
  const getMobileActions = (): MobileAction[] => [
    {
      id: 'exit',
      icon: Minimize2,
      label: 'Exit Focus Mode',
      onClick: handleExitMaximized,
      show: isMaximized,
      animationDelay: '0ms'
    },
    {
      id: 'focus',
      icon: Maximize2, 
      label: 'Focus Mode',
      onClick: () => setIsMaximized(true),
      show: !isMaximized,
      animationDelay: '0ms'
    },
    {
      id: 'notes',
      icon: BookOpen,
      label: 'Select Note',
      onClick: () => setShowNoteSelector(true),
      show: notes.length > 0,
      animationDelay: '50ms'
    },
    {
      id: 'new',
      icon: Plus,
      label: 'New Note',
      onClick: createNewNote,
      animationDelay: '100ms'
    },
    {
      id: 'delete',
      icon: Trash2,
      label: 'Delete Note',
      onClick: () => selectedNote && deleteNote(selectedNote.id),
      show: !!(selectedNote && (content.trim() || title !== 'New Note')),
      variant: 'destructive' as const,
      animationDelay: '150ms'
    },
    {
      id: 'save',
      icon: Save,
      label: 'Save Note',
      onClick: saveNote,
      disabled: saving || (!content.trim() && title === 'New Note'),
      loading: saving,
      variant: 'primary' as const,
      animationDelay: '200ms'
    }
  ];

  if (loading) {
    return (
      <section className={`${isMaximized ? 'fixed inset-0 z-50 h-screen' : 'h-[400px]'} border rounded-lg bg-white shadow-sm flex items-center justify-center`}>
        <Loader2 className="w-6 h-6 animate-spin" />
      </section>
    );
  }

  return (
    <>
      <section ref={notepadSectionRef} className={`${isMaximized ? `fixed inset-0 ${showNoteSelector ? 'z-40' : 'z-50'} h-screen w-screen bg-gradient-to-br from-amber-50 via-orange-25 to-yellow-50 shadow-2xl` : 'h-[600px] md:h-[450px] max-w-full border rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300'} overflow-hidden`} style={isMaximized ? {width: '100vw', height: '100vh', left: 0, top: 0, margin: 0, padding: 0} : {}}>
      <div className="h-full flex flex-col lg:flex-row min-w-0">
        {/* Notes List Sidebar - Hidden when maximized, stacked on mobile */}
        {!isMaximized && (
          <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col bg-gray-50 max-h-40 lg:max-h-none">
            <div className="pl-4 pr-2 lg:px-6 py-3 lg:py-4 border-b border-gray-200 flex items-center justify-between">
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
        <div className={`flex-1 flex flex-col min-w-0 ${isMaximized ? 'bg-transparent' : 'bg-gray-50'}`}>
          <div className={`px-4 lg:px-6 py-1.5 lg:py-1.5 border-b min-w-0 ${isMaximized ? 'border-amber-200/60 bg-amber-100/50 backdrop-blur-sm' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex items-center gap-2 min-w-0">
              <FileText className={`w-4 h-4 flex-shrink-0 hidden lg:block ${isMaximized ? 'text-amber-800' : 'text-gray-600'}`} />
              
              {/* Note title editor - flex-1 to take available space */}
              <div className="flex-1 min-w-0">
                <textarea
                  ref={titleTextareaRef}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onFocus={(e) => {
                    if (title === 'New Note') {
                      setTitle('');
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      contentTextareaRef.current?.focus();
                    }
                  }}
                  rows={1}
                  className={`text-lg lg:text-xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 px-0 py-0 w-full font-heading resize-none ${isMaximized ? 'text-amber-900' : 'text-gray-900'} leading-tight tracking-wide`}
                  placeholder="New Note"
                  style={{
                    minHeight: '1.5rem',
                    height: 'auto'
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = target.scrollHeight + 'px';
                  }}
                />
              </div>
              
              {/* Buttons container - flex-shrink-0 to keep on same row */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {/* Desktop: Show all buttons */}
                <div className="hidden lg:flex items-center gap-2">
                  {/* Note selector dropdown button */}
                  {notes.length > 0 && (
                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => setShowNoteSelector(!showNoteSelector)}
                        className={`px-2 py-1 rounded text-sm transition-colors flex items-center justify-center gap-1 ${isMaximized ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-600 hover:bg-gray-700 text-white'}`}
                        title="Select existing note"
                      >
                        {showNoteSelector ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                        <span>Notes</span>
                      </button>
                      
                      {/* Hidden dropdown for saved notes */}
                      {showNoteSelector && (
                        <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white border rounded-lg shadow-lg z-[9999] max-h-64 overflow-y-auto w-[280px] ${isMaximized ? 'border-amber-200' : 'border-gray-200'}`}>
                          <div className="p-1">
                            {notes.map((note) => (
                              <button
                                key={note.id}
                                onClick={() => {
                                  selectNote(note);
                                  setShowNoteSelector(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded hover:bg-gray-50 transition-colors text-sm block ${
                                  selectedNote?.id === note.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                                }`}
                              >
                                <div className="font-medium whitespace-normal break-words leading-tight mb-1">
                                  {getNoteDisplayTitle(note)}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {formatDate(note.created_at)}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Auto-saved timer */}
                  {lastSaved && (
                    <span className={`text-xs px-2 py-1 rounded-full ${isMaximized ? 'text-amber-600 bg-amber-100' : 'text-gray-500 bg-gray-100'}`}>
                      Auto-saved: {lastSaved.toLocaleTimeString()}
                    </span>
                  )}

                  {/* New Note button for maximized view */}
                  {isMaximized && (
                    <button
                      onClick={createNewNote}
                      className="px-2 py-1 bg-green-700 text-white rounded text-sm hover:bg-green-800 transition-colors flex items-center gap-1"
                      title="New Note"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New</span>
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
                      <span>Delete</span>
                    </button>
                  )}

                  <button
                    onClick={() => setIsMaximized(!isMaximized)}
                    className={`px-2 py-1 text-white rounded text-sm transition-colors flex items-center justify-center gap-1 ${isMaximized ? 'bg-amber-600 hover:bg-amber-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                    title={isMaximized ? 'Exit Focus Mode' : 'Enter Focus Mode'}
                  >
                    {isMaximized ? (
                      <>
                        <Minimize2 className="w-3.5 h-3.5" />
                        <span>Exit Focus</span>
                      </>
                    ) : (
                      <>
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Focus Mode</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={saveNote}
                    disabled={saving || (!content.trim() && title === 'New Note')}
                    className={`px-2 py-1 text-white rounded text-sm transition-colors flex items-center justify-center gap-1 disabled:opacity-50 ${isMaximized ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                  >
                  {saving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </>
                  )}
                </button>
                </div>

                {/* Mobile: Use our new MobileActionMenu component */}
                <div className="lg:hidden relative z-[60]">
                  <MobileActionMenu
                    actions={getMobileActions()}
                    isOpen={showMobileActions}
                    onToggle={() => setShowMobileActions(!showMobileActions)}
                    onClose={() => setShowMobileActions(false)}
                    isMaximized={isMaximized}
                    triggerPosition={isMaximized ? 'fixed' : 'relative'}
                    theme="auto"
                  />
                  
                  {/* Notes dropdown for non-maximized mobile - positioned relative to action menu */}
                  {showNoteSelector && notes.length > 0 && !isMaximized && (
                    <div className="absolute top-full right-0 mt-2 z-[9999] bg-white border border-gray-200 rounded-lg shadow-xl max-h-64 overflow-y-auto w-[280px]">
                      <div className="p-1">
                        {notes.map((note) => (
                          <button
                            key={note.id}
                            onTouchStart={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              selectNote(note);
                              setShowNoteSelector(false);
                              setShowMobileActions(false);
                            }}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              selectNote(note);
                              setShowNoteSelector(false);
                              setShowMobileActions(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded hover:bg-gray-50 transition-colors text-sm block ${
                              selectedNote?.id === note.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                            }`}
                            style={{
                              pointerEvents: 'auto',
                              touchAction: 'manipulation'
                            }}
                          >
                            <div className="font-medium whitespace-normal break-words leading-tight mb-1">
                              {getNoteDisplayTitle(note)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatDate(note.created_at)}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Notes dropdown from mobile menu */}
                {showNoteSelector && notes.length > 0 && isMaximized && typeof window !== 'undefined' && 
                  createPortal(
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                        style={{ zIndex: 9998 }}
                        onClick={() => {
                          setShowNoteSelector(false);
                          setShowMobileActions(false);
                        }}
                      />
                      {/* Dropdown */}
                      <div 
                        className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-white border border-amber-200 rounded-lg shadow-2xl max-h-96 overflow-y-auto w-[300px]"
                        style={{ zIndex: 9999 }}
                      >
                        <div className="p-1">
                          {notes.map((note) => (
                            <button
                              key={note.id}
                              onTouchStart={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                selectNote(note);
                                setShowNoteSelector(false);
                                setShowMobileActions(false);
                              }}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                selectNote(note);
                                setShowNoteSelector(false);
                                setShowMobileActions(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded hover:bg-gray-50 transition-colors text-sm block ${
                                selectedNote?.id === note.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                              }`}
                              style={{
                                pointerEvents: 'auto',
                                touchAction: 'manipulation'
                              }}
                            >
                              <div className="font-medium whitespace-normal break-words leading-tight mb-1">
                                {getNoteDisplayTitle(note)}
                              </div>
                              <div className="text-xs text-gray-500">
                                {formatDate(note.created_at)}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </>,
                    document.body
                  )
                }
                
              </div>
            </div>
          </div>
          
          <div className={`flex-1 ${isMaximized ? 'mx-2 lg:mx-12 my-2 lg:my-8 rounded-xl shadow-2xl border border-amber-200/30 bg-white/95 backdrop-blur-md' : 'shadow-inner border border-gray-200/50'}`}>
            <textarea
              ref={contentTextareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full h-full resize-none focus:outline-none focus:ring-0 border-0 text-base leading-relaxed ${
                isMaximized 
                  ? 'p-4 lg:p-12 bg-transparent text-amber-950 placeholder-amber-500/60 lg:text-xl font-light tracking-wide' 
                  : 'p-3 lg:p-4 bg-white text-gray-900 placeholder-gray-500'
              }`}
              placeholder={isMaximized ? "Let your thoughts flow..." : "Start writing your thoughts..."}
            />
          </div>
        </div>
      </div>
      </section>
    </>
  );
};