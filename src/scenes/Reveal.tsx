import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useExperienceState } from "../state/experienceState";
import { revealContent } from "../story/storyContent";

export default function Reveal() {
  const { setScene } = useExperienceState();
  const [lineIndex, setLineIndex] = useState(0);
  const [showPunchline, setShowPunchline] = useState(false);

  const handleProgress = () => {
    if (showPunchline) return;

    if (lineIndex < revealContent.length - 1) {
      setLineIndex((prev) => prev + 1);
    } else {
      setShowPunchline(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      onClick={handleProgress}
      className={`relative w-full h-screen flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-colors duration-1000 p-4 ${
        showPunchline ? "bg-mela-night text-mela-cream" : "bg-black text-mela-cream"
      }`}
    >
      {/* Decorative Tent Stripes (only show on punchline) */}
      <AnimatePresence>
        {showPunchline && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, var(--color-mela-red) 0, var(--color-mela-red) 40px, transparent 40px, transparent 80px)"
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!showPunchline ? (
          <motion.div
            key="buildup"
            className="flex flex-col items-center text-center max-w-2xl z-10"
          >
            {revealContent.map((line, i) => {
              if (i > lineIndex) return null;
              
              return (
                <motion.div
                  key={`reveal-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="mb-6"
                >
                  <p className="font-display text-3xl md:text-5xl tracking-wide px-4">
                    {line}
                  </p>
                </motion.div>
              );
            })}
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="mt-12 font-sans text-xs tracking-widest uppercase opacity-50 text-mela-gold"
            >
              Tap to continue
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="punchline"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col items-center text-center z-10 w-full max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-sans font-black tracking-tighter text-mela-cream mb-8 leading-tight drop-shadow-2xl px-4">
              MERE PAAS AAPKI<br/>
              EK BHI PHOTO<br/>
              NAHI HAI.
            </h1>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, type: "spring", bounce: 0.5 }}
              className="text-6xl mb-8"
            >
              😭
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="flex flex-col items-center"
            >
              <p className="text-lg md:text-3xl font-display text-mela-cream/80 mb-12 px-4 text-center">
                Matlab ye dosti ka documentation department itna bekaar kaise hai?
              </p>
              
              <h2 className="text-3xl md:text-4xl font-display text-mela-gold neon-text-gold mb-8 uppercase tracking-widest text-center px-4">
                Toh chalo ek banate hain.
              </h2>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setScene("photo-booth");
                }}
                className="px-10 py-4 bg-mela-red text-mela-cream font-sans tracking-widest font-bold uppercase rounded-md shadow-[0_0_20px_#D32F2F] hover:bg-mela-orange transition-all border-2 border-mela-gold"
              >
                Open Photo Booth
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
