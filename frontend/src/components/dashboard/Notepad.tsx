// src/components/dashboard/Notepad.tsx
'use client';

import { useState, useEffect } from 'react';
import { useProtectedApi } from '../../lib/api/protected';
import { Save, Loader2 } from 'lucide-react';

export const Notepad = () => {
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const api = useProtectedApi();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const note = await api.get<{ content: string }>('/api/v1/notes/latest');
        setContent(note.content);
      } catch (error) {
        console.error('Failed to fetch note:', error);
      }
    };

    fetchNote();
  }, []);

  const saveNote = async () => {
    setSaving(true);
    try {
      await api.post('/api/v1/notes', { content });
      setLastSaved(new Date());
    } catch (error) {
      console.error('Failed to save note:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="h-[400px] border rounded-lg bg-white shadow-sm">
      <div className="h-full flex flex-col">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Quick Notes</h2>
          <div className="flex items-center gap-3">
            {lastSaved && (
              <span className="text-sm text-gray-500">
                Last saved: {lastSaved.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={saveNote}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save
                </>
              )}
            </button>
          </div>
        </div>
        <div className="flex-1 p-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:border-green-500 focus:text-white font-white text-white resize-none"
            placeholder="Type your notes here..."
          />
        </div>
      </div>
    </section>
  );
};