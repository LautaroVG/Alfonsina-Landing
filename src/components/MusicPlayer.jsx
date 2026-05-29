import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio('/AlfonCantando.m4a')); 

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }
    setIsPlaying(!isPlaying);
  };

  return (
    /* Contenedor con la posición adaptativa para celular y PC */
    <div className="fixed top-[92px] md:bottom-6 md:top-auto right-6 z-50 flex items-center gap-2 select-none">
      
      <AnimatePresence>
        {isPlaying && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase bg-black/60 backdrop-blur-xs px-2 py-1 rounded border border-neutral-800"
          >
            On Air
          </motion.span>
        )}
      </AnimatePresence>

      <button
        onClick={toggleAudio}
        className="p-3 bg-black/80 hover:bg-black text-white rounded-full border border-neutral-800 backdrop-blur-md shadow-lg transition-colors cursor-pointer group relative flex items-center justify-center"
        aria-label={isPlaying ? "Mutear música" : "Escuchar música"}
      >
        {isPlaying ? (
          <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 18.75V5.25L7.75 9.5H4.5v5h3.25L12 18.75z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25M12 18.75V5.25L7.75 9.5H4.5v5h3.25L12 18.75z" />
          </svg>
        )}

        {!isPlaying && (
          <span className="absolute inset-0 rounded-full border border-[#D4AF37]/40 animate-ping pointer-events-none" />
        )}
      </button>
    </div>
  );
}