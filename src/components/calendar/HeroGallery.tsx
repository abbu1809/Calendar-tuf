import { motion, AnimatePresence } from 'framer-motion';
import { monthImages, monthNames } from '../../utils/monthImages';
import { format } from 'date-fns';

interface HeroGalleryProps {
  currentDate: Date;
  direction: number;
}

export function HeroGallery({ currentDate, direction }: HeroGalleryProps) {
  const monthIndex = currentDate.getMonth();
  const currentImage = monthImages[monthIndex];
  const monthName = monthNames[monthIndex];

  return (
    <div className="w-full xl:w-[450px] flex-shrink-0 flex flex-col relative overflow-hidden bg-black/40 backdrop-blur-3xl border-r border-white/10">

      {/* Liquid glass floating elements in background */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

      <div className="p-10 pb-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/50 text-xs font-semibold tracking-[0.2em] mb-3 uppercase"
        >
          Collection  {format(currentDate, "yyyy")}
        </motion.div>
        <div className="overflow-hidden h-16 relative">
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            <motion.h1
              key={monthName}
              custom={direction}
              initial={{ opacity: 0, y: direction * 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction * -40 }}
              transition={{ duration: 0.5, ease: "anticipate" }}
              className="text-5xl font-serif text-white leading-tight absolute"
            >
              {monthName}
            </motion.h1>
          </AnimatePresence>
        </div>
        <div className="text-white/60 font-light mt-1">
          {format(currentDate, "yyyy")}
        </div>
      </div>

      <div className="flex-1 p-10 flex flex-col justify-center min-h-[350px] xl:min-h-0 relative z-20">
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] border border-white/20">

          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              initial={{ scale: 1.2, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: "circOut" }}
              src={currentImage}
              alt={`${monthName} aesthetic`}
              className="w-full h-full object-cover absolute inset-0 mix-blend-overlay opacity-90"
            />
          </AnimatePresence>

          {/* Glass overlay on image */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
