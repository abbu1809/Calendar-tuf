import { motion, AnimatePresence } from 'framer-motion';
import { format, isSameDay, parseISO } from 'date-fns';
import { X, PenLine, Calendar as CalendarIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { Note } from '../../types';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  notes: Note[];
  onAddNote: (text: string) => void;
  onDeleteNote: (id: string, e: React.MouseEvent) => void;
}

export function NoteModal({ isOpen, onClose, selectedDate, notes, onAddNote, onDeleteNote }: NoteModalProps) {
  const [newNoteText, setNewNoteText] = useState('');

  const selectedDateNotes = notes.filter(
    n => selectedDate && isSameDay(parseISO(n.date), selectedDate)
  );

  const handleAdd = () => {
    if (newNoteText.trim()) {
      onAddNote(newNoteText);
      setNewNoteText('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
            className="relative w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl">
                  <CalendarIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white">Daily Notes</h3>
                  <p className="text-white/60 text-sm">
                    {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'No date selected'}
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {selectedDateNotes.length > 0 ? (
                selectedDateNotes.map(note => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={note.id} 
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl relative group hover:bg-white/10 transition-colors"
                  >
                    <p className="text-white/90 text-[15px] leading-relaxed pr-8">{note.text}</p>
                    <button 
                      onClick={(e) => onDeleteNote(note.id, e)}
                      className="absolute top-4 right-4 p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-400 rounded-md transition-all text-white/40"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-white/40 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                    <PenLine className="w-7 h-7 opacity-50" />
                  </div>
                  <p className="text-sm">No notes written for this day</p>
                </div>
              )}
            </div>

            {/* Editor Input */}
            <div className="p-6 bg-black/20 border-t border-white/10">
              <div className="flex flex-col gap-3">
                <textarea 
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Jot down a thought..."
                  className="w-full min-h-[100px] resize-none border border-white/10 rounded-2xl p-4 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all font-light"
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/40 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                    Attached to {selectedDate ? format(selectedDate, 'MMM d') : '-'}
                  </span>
                  <button
                    onClick={handleAdd}
                    disabled={!newNoteText.trim() || !selectedDate}
                    className="px-6 py-2.5 bg-white text-black rounded-xl font-medium text-sm hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
