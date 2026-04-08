import { useState } from 'react';
import { addMonths, subMonths, isBefore, addDays } from 'date-fns';
import { CalendarGrid } from './calendar/CalendarGrid';
import { HeroGallery } from './calendar/HeroGallery';
import { NoteModal } from './calendar/NoteModal';
import type { Note, DateRange } from '../types';
import { ChevronLeft, ChevronRight, PenLine } from 'lucide-react';

const initialNotes: Note[] = [
  { id: '1', date: new Date().toISOString(), text: 'Design review at 2 PM' },
  { id: '2', date: addDays(new Date(), 2).toISOString(), text: 'Launch campaign' }
];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [direction, setDirection] = useState(1);
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });

  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNoteDate, setSelectedNoteDate] = useState<Date | null>(null);

  const handleNextMonth = () => {
    setDirection(1);
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleDateClick = (day: Date) => {
    const { start, end } = dateRange;
    if (start && !end && isBefore(start, day)) {
      setDateRange({ start, end: day });
    } else if (start && !end && isBefore(day, start)) {
      setDateRange({ start: day, end: start });
    } else {
      setDateRange({ start: day, end: null });
    }

    // Always pre-select day for notes
    setSelectedNoteDate(day);
  };

  const currentMonthThemeColor = "rgba(255, 255, 255, 0.05)";

  return (
    <div className="w-full max-w-[1200px] flex flex-col xl:flex-row bg-[#080808]/40 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10 relative isolate">

      {/* Visual noise / texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      {/* Left side: Image Gallery representing the current month */}
      <HeroGallery currentDate={currentDate} direction={direction} />

      {/* Right side: Interactive Calendar UI */}
      <div className="flex-1 flex flex-col relative bg-gradient-to-br from-white/5 to-transparent">

        {/* Controls */}
        <div className="flex items-center justify-between px-8 py-8 md:py-10">
          <div className="flex gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white border border-white/5 group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white border border-white/5 group"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 transition-all text-white font-medium"
          >
            <PenLine className="w-4 h-4" />
            Write Note
          </button>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 w-full px-8 pb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-medium text-white/40 text-xs tracking-widest uppercase">
              {day}
            </div>
          ))}
        </div>

        {/* Grid wrapping container */}
        <div className="flex-1 px-8 pb-10 min-h-[600px] flex flex-col relative overflow-hidden">
          <CalendarGrid
            currentDate={currentDate}
            dateRange={dateRange}
            notes={notes}
            onDateClick={handleDateClick}
            direction={direction}
          />
        </div>

      </div>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedNoteDate}
        notes={notes}
        onAddNote={(text) => setNotes([...notes, { id: Date.now().toString(), date: selectedNoteDate!.toISOString(), text }])}
        onDeleteNote={(id, e) => {
          e.stopPropagation();
          setNotes(notes.filter(n => n.id !== id));
        }}
      />
    </div>
  );
}
