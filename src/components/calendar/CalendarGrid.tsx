import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  isWithinInterval,
  isBefore,
  parseISO
} from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { Note, DateRange } from '../../types';
import { useState } from 'react';

interface CalendarGridProps {
  currentDate: Date;
  dateRange: DateRange;
  notes: Note[];
  onDateClick: (date: Date) => void;
  direction: number; // 1 for next, -1 for prev
}

export function CalendarGrid({ currentDate, dateRange, notes, onDateClick, direction }: CalendarGridProps) {
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDateGrid = startOfWeek(monthStart);
  const endDateGrid = endOfWeek(monthEnd);

  const daysToRender = [];
  let day = startDateGrid;

  while (day <= endDateGrid) {
    daysToRender.push(day);
    day = addDays(day, 1);
  }

  // Liquid glassmorphism grid overlay for month transition
  return (
    <div className="flex-1 w-full relative perspective-1000">
      <AnimatePresence mode="popLayout" custom={direction} initial={false}>
        <motion.div
          key={currentDate.toISOString()}
          custom={direction}
          initial={{ opacity: 0, x: direction * 50, rotateY: direction * 15, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
          exit={{ opacity: 0, x: direction * -50, rotateY: direction * -15, scale: 0.95 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
          className="absolute inset-0 grid grid-cols-7 auto-rows-fr select-none"
        >
          {daysToRender.map((currentDay) => {
            const isCurrentMonth = isSameMonth(currentDay, monthStart);
            const isToday = isSameDay(currentDay, new Date());
            const hasNotes = notes.some(n => isSameDay(parseISO(n.date), currentDay));

            // Range logic
            const { start, end } = dateRange;
            const isStart = start && isSameDay(currentDay, start);
            const isEnd = end && isSameDay(currentDay, end);
            const isBetween = start && end && isWithinInterval(currentDay, { start, end }) && !isStart && !isEnd;
            const isHoverBetween = start && !end && hoverDate && isBefore(start, hoverDate) && isWithinInterval(currentDay, { start, end: hoverDate }) && !isStart;

            return (
              <motion.div
                key={currentDay.toString()}
                onClick={() => onDateClick(currentDay)}
                onMouseEnter={() => setHoverDate(currentDay)}
                onMouseLeave={() => setHoverDate(null)}
                className={cn(
                  "relative flex flex-col items-center justify-start p-2 min-h-[80px] sm:min-h-[100px] cursor-pointer border-b border-r border-white/10 transition-all duration-300",
                  !isCurrentMonth && "opacity-30",
                  "hover:bg-white/10"
                )}
              >
                {/* Background Selection Indicator (Liquid glass style) */}
                {isStart && end && !isSameDay(start, end) && (
                  <motion.div layoutId="start-tail" className="absolute right-0 top-[10%] bottom-[10%] w-1/2 bg-white/20 backdrop-blur-md rounded-l-full -z-10" />
                )}
                {isEnd && start && !isSameDay(start, end) && (
                  <motion.div layoutId="end-tail" className="absolute left-0 top-[10%] bottom-[10%] w-1/2 bg-white/20 backdrop-blur-md rounded-r-full -z-10" />
                )}
                {(isBetween || isHoverBetween) && (
                  <motion.div className="absolute inset-y-[10%] inset-x-0 bg-white/20 backdrop-blur-md -z-10" />
                )}

                {/* Day Number */}
                <div className={cn(
                  "relative z-10 flex items-center justify-center w-10 h-10 rounded-full text-sm sm:text-lg transition-all duration-500",
                  isStart || isEnd ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.7)] scale-110" : "text-white/90",
                  isToday && !isStart && !isEnd && "border-2 border-white/50 font-bold",
                )}>
                  {format(currentDay, "d")}

                  {/* Subtle dot indication for notes instead of long text */}
                  {hasNotes && !(isStart || isEnd) && (
                    <div className="absolute -bottom-1 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                  )}
                  {hasNotes && (isStart || isEnd) && (
                    <div className="absolute -bottom-1 w-1.5 h-1.5 bg-black rounded-full" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
