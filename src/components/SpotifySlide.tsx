import type { ReactNode } from 'react';
import { motion } from 'motion/react';

interface Props {
  children: ReactNode;
  bgColor: string;
  slideNumber?: number;
  totalSlides?: number;
  onNext?: () => void;
  nextText?: string;
  showCheckeredCorners?: boolean;
}

export function SpotifySlide({ 
  children, 
  bgColor, 
  slideNumber, 
  totalSlides = 7, 
  onNext, 
  nextText = "NEXT →",
  showCheckeredCorners = false
}: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full h-screen overflow-hidden flex flex-col justify-center p-8 md:p-16`}
      style={{ backgroundColor: bgColor }}
    >
      {showCheckeredCorners && (
        <>
          <div className="absolute top-0 left-0 w-32 h-32 bg-checkered opacity-50" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-checkered opacity-50" />
        </>
      )}

      {/* Progress Indicator */}
      {slideNumber && (
        <div className="absolute top-8 right-8 font-thin text-xl tracking-widest text-sp-black mix-blend-overlay font-bold">
          {String(slideNumber).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </div>
      )}

      {/* Main Content */}
      <div className="z-10 flex-1 flex flex-col justify-center">
        {children}
      </div>

      {/* Next Button */}
      {onNext && (
        <div className="absolute bottom-8 right-8 z-20">
          <button 
            onClick={onNext}
            className="group flex items-center gap-2 bg-sp-black text-sp-white px-6 py-2 rounded-full font-sans font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform"
          >
            {nextText}
          </button>
        </div>
      )}
    </motion.div>
  );
}
