import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useExperienceState } from "../state/experienceState";
import { birthdayStory } from "../story/storyContent";
import melaNight from "../assets/mela_night.jpg";

export default function Story() {
  const { storyIndex, setStoryIndex, setScene } = useExperienceState();
  const [lineIndex, setLineIndex] = useState(0);

  const currentSegment = birthdayStory[storyIndex];

  // Auto-progress lines if they don't have a specific delay
  useEffect(() => {
    if (!currentSegment) return;
    
    // We only show ONE line at a time now.
    // If the user hasn't clicked, we can auto-advance if we want, but tap-to-advance is safer.
  }, [lineIndex, currentSegment]);

  if (!currentSegment) {
    setScene("reveal");
    return null;
  }

  const handleProgress = () => {
    if (lineIndex < currentSegment.lines.length - 1) {
      setLineIndex((prev) => prev + 1);
    } else {
      if (storyIndex < birthdayStory.length - 1) {
        setStoryIndex(storyIndex + 1);
        setLineIndex(0);
      } else {
        setScene("reveal");
      }
    }
  };

  const currentLine = currentSegment.lines[lineIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      onClick={handleProgress}
      className="relative w-full h-screen flex flex-col items-center justify-center cursor-pointer overflow-hidden p-6"
      style={{
        backgroundImage: `url(${melaNight})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-all duration-1000"></div>

      {/* Glassmorphism Container for Text */}
      <div className="z-10 w-full max-w-4xl flex flex-col items-center justify-center h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${storyIndex}-${lineIndex}`}
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)", transition: { duration: 0.5 } }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full text-center"
          >
            <p className="font-sans text-3xl md:text-5xl lg:text-6xl text-mela-cream tracking-wide leading-relaxed drop-shadow-xl font-medium">
              {currentLine}
            </p>
          </motion.div>
        </AnimatePresence>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute bottom-12 font-sans text-xs tracking-widest uppercase opacity-50 text-mela-gold"
        >
          Tap to continue
        </motion.div>
      </div>
    </motion.div>
  );
}
