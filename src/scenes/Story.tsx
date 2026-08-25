import { motion, AnimatePresence } from "motion/react";
import { useExperienceState } from "../state/experienceState";
import { birthdayStory } from "../story/storyContent";
import { SpotifySlide } from "../components/SpotifySlide";
import { StarShape, FlowerShape, Pill } from "../components/Shapes";

// Helper to map color string to CSS variable
const getColor = (theme: string) => {
  switch(theme) {
    case 'green': return 'var(--color-sp-green)';
    case 'magenta': return 'var(--color-sp-magenta)';
    case 'blue': return 'var(--color-sp-blue)';
    case 'purple': return 'var(--color-sp-purple)';
    case 'orange': return 'var(--color-sp-orange)';
    case 'black': return 'var(--color-sp-black)';
    default: return 'var(--color-sp-green)';
  }
};

const getTextColor = (theme: string) => {
  if (theme === 'black') return 'var(--color-sp-white)';
  if (theme === 'blue' || theme === 'purple') return 'var(--color-sp-white)';
  return 'var(--color-sp-black)';
};

// Component to mix thin and bold letters to create "chatak" vibe
const MixedFontText = ({ text, textColor }: { text: string, textColor: string }) => {
  const words = text.split(" ");
  return (
    <h2 className={`text-4xl md:text-6xl lg:text-7xl leading-none uppercase max-w-4xl tracking-tight`} style={{ color: textColor }}>
      {words.map((word, i) => {
        // Randomly make some words thin
        const isThin = word.length > 5 && i % 3 === 0;
        return (
          <span key={i} className={isThin ? "font-thin tracking-normal" : "font-display font-bold"}>
            {word}{" "}
          </span>
        );
      })}
    </h2>
  );
}

export default function Story() {
  const { storyIndex, setStoryIndex, setScene } = useExperienceState();

  const currentSegment = birthdayStory[storyIndex];

  if (!currentSegment) {
    setScene("reveal");
    return null;
  }

  const handleNext = () => {
    if (storyIndex < birthdayStory.length - 1) {
      setStoryIndex(storyIndex + 1);
    } else {
      setScene("reveal");
    }
  };

  const bgColor = getColor(currentSegment.theme);
  const textColor = getTextColor(currentSegment.theme);
  const isDarkBg = currentSegment.theme === 'black' || currentSegment.theme === 'blue' || currentSegment.theme === 'purple';

  return (
    <AnimatePresence mode="wait">
      <motion.div key={currentSegment.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <SpotifySlide 
          bgColor={bgColor}
          slideNumber={storyIndex + 1}
          totalSlides={birthdayStory.length + 1}
          onNext={handleNext}
          showCheckeredCorners={currentSegment.theme === 'green' || currentSegment.theme === 'orange'}
        >
          <div className="relative w-full h-full flex flex-col justify-center px-4 md:px-12">
            
            {/* Decorators */}
            {currentSegment.theme === 'magenta' && (
              <FlowerShape color="var(--color-sp-blue)" className="absolute right-10 top-1/4 w-24 h-24" />
            )}
            {currentSegment.theme === 'black' && (
              <StarShape color="var(--color-sp-blue)" className="absolute right-20 top-1/3 w-20 h-20" />
            )}
            
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="z-10"
            >
              <MixedFontText text={currentSegment.title} textColor={textColor} />
              
              {currentSegment.subtitle && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <span 
                    className="inline-block px-4 py-2 font-display font-bold uppercase tracking-widest text-lg md:text-2xl"
                    style={{ 
                      backgroundColor: isDarkBg ? 'var(--color-sp-green)' : 'var(--color-sp-black)',
                      color: isDarkBg ? 'var(--color-sp-black)' : 'var(--color-sp-white)'
                    }}
                  >
                    {currentSegment.subtitle}
                  </span>
                </motion.div>
              )}

              {currentSegment.stickers && (
                <div className="mt-8 flex flex-wrap gap-4 max-w-xl">
                  {currentSegment.stickers.map((sticker, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: Math.random() * 10 - 5 }}
                      transition={{ delay: 0.2 + (i * 0.1), type: "spring" }}
                    >
                      <Pill 
                        text={sticker} 
                        bgColor={i % 2 === 0 ? "var(--color-sp-green)" : "var(--color-sp-magenta)"} 
                        textColor="var(--color-sp-black)"
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </SpotifySlide>
      </motion.div>
    </AnimatePresence>
  );
}
