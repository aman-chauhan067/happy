import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useExperienceState } from "../state/experienceState";
import { generatePhotoStrip } from "../photo/generatePhotoStrip";
import { downloadPhoto } from "../photo/sharePhoto";
import melaBooth from "../assets/mela_booth.jpg";

type FinaleStep = "generating" | "photo-reveal" | "sincere" | "buildup" | "punchline" | "end";

export default function Finale() {
  const { capturedPhotos, setScene, setCapturedPhotos, setStoryIndex } = useExperienceState();
  const [photoStrip, setPhotoStrip] = useState<string | null>(null);
  const [step, setStep] = useState<FinaleStep>("generating");

  // Sub-step indices for pacing the text
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    if (capturedPhotos.length >= 4) {
      generatePhotoStrip(capturedPhotos.slice(0, 4)).then(url => {
        setPhotoStrip(url);
        setStep("photo-reveal");
      });
    } else {
      setScene("photo-booth");
    }
  }, [capturedPhotos, setScene]);

  const handleRestart = () => {
    setCapturedPhotos([]);
    setStoryIndex(0);
    setScene("hero");
  };

  const handleDownload = () => {
    if (photoStrip) {
      downloadPhoto(photoStrip);
    }
  };

  const advanceText = (maxIndex: number, nextStep: FinaleStep) => {
    if (textIndex < maxIndex) {
      setTextIndex(prev => prev + 1);
    } else {
      setTextIndex(0);
      setStep(nextStep);
      
      // Auto-advance punchline after 4 seconds
      if (nextStep === "punchline") {
        setTimeout(() => {
          setStep("end");
        }, 6000);
      }
    }
  };

  if (step === "generating" || !photoStrip) {
    return (
      <div className="w-full h-screen bg-mela-night flex items-center justify-center">
        <p className="font-sans tracking-widest text-mela-gold animate-pulse text-2xl">Developing film...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden"
      style={{
        backgroundImage: `url(${melaBooth})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dynamic background dimming based on step */}
      <div className={`absolute inset-0 transition-all duration-1000 ${
        ["punchline", "end"].includes(step) ? "bg-black/90 backdrop-blur-md" : "bg-black/40"
      }`} />

      <AnimatePresence mode="wait">

        {/* Step 1: Photo Reveal */}
        {step === "photo-reveal" && (
          <motion.div 
            key="photo-reveal"
            className="z-10 flex flex-col items-center w-full max-w-lg cursor-pointer"
            onClick={() => advanceText(2, "sincere")}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="relative w-48 md:w-64 max-h-[50vh] flex justify-center mb-8 shadow-[0_10px_40px_rgba(0,0,0,0.8)] rounded-sm overflow-hidden border-4 border-white rotate-2 bg-white"
            >
              <img src={photoStrip} alt="Your Photo Strip" className="w-full h-full object-contain block" />
            </motion.div>
            
            <div className="text-center min-h-[120px] bg-black/60 backdrop-blur-md px-8 py-6 rounded-2xl border border-white/10 shadow-xl">
              {textIndex >= 0 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl md:text-2xl font-sans text-mela-cream mb-2">
                  Okay...
                </motion.p>
              )}
              {textIndex >= 1 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl md:text-2xl font-sans text-mela-cream mb-4">
                  Ab officially mere paas aapki ek photo hai.
                </motion.p>
              )}
              {textIndex >= 2 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl md:text-4xl font-display text-mela-gold neon-text-gold tracking-widest">
                  Mission successful.
                </motion.p>
              )}
            </div>
            
            <motion.p animate={{ opacity: [0, 0.5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-8 font-sans text-xs uppercase tracking-widest text-white drop-shadow-md">
              Tap to continue
            </motion.p>
          </motion.div>
        )}

        {/* Step 2: Sincere */}
        {step === "sincere" && (
          <motion.div 
            key="sincere"
            className="z-10 flex flex-col items-center text-center w-full max-w-2xl cursor-pointer"
            onClick={() => advanceText(3, "buildup")}
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05, transition: { duration: 1.5 } }}
          >
            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
              {textIndex >= 0 && (
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xl font-sans italic text-white/70 mb-6">
                  Jokes apart...
                </motion.p>
              )}
              {textIndex >= 1 && (
                <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-sans font-black text-white drop-shadow-lg mb-8 uppercase tracking-widest">
                  Happy Birthday Himanshu Ji.
                </motion.h2>
              )}
              {textIndex >= 2 && (
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-lg md:text-xl font-sans text-mela-cream mb-8 leading-relaxed font-light">
                  Thank you for all the random conversations, unnecessary bakchodi, and especially for being there when it actually mattered.
                </motion.p>
              )}
              {textIndex >= 3 && (
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-3xl font-display text-mela-gold drop-shadow-md">
                  I hope aapka ye saal bohot mast jaaye.
                </motion.p>
              )}
            </div>
            
            <motion.p animate={{ opacity: [0, 0.5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-8 font-sans text-xs uppercase tracking-widest text-white drop-shadow-md">
              Tap to continue
            </motion.p>
          </motion.div>
        )}

        {/* Step 3: Buildup (Handwritten style) */}
        {step === "buildup" && (
          <motion.div 
            key="buildup"
            className="z-10 flex flex-col items-center text-center w-full cursor-pointer"
            onClick={() => advanceText(2, "punchline")}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            {textIndex >= 0 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-5xl md:text-7xl font-display text-white drop-shadow-lg mb-6">
                Aur haan...
              </motion.p>
            )}
            {textIndex >= 1 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl md:text-5xl font-display italic text-white drop-shadow-lg mb-6">
                ek cheez toh main bhul hi gaya...
              </motion.p>
            )}
            {textIndex >= 2 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-6xl md:text-8xl font-display text-mela-gold drop-shadow-[0_0_15px_#FFD700] mb-6">
                Toh...
              </motion.p>
            )}
            <motion.p animate={{ opacity: [0, 0.5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-12 font-sans text-xs uppercase tracking-widest text-white">
              Tap
            </motion.p>
          </motion.div>
        )}

        {/* Step 4: Inside Joke */}
        {step === "punchline" && (
          <motion.div 
            key="punchline"
            className="z-10 flex flex-col items-center text-center w-full"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 2 } }}
          >
            <motion.h1 
              initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-4xl md:text-7xl font-sans font-black tracking-tighter text-white drop-shadow-[0_0_20px_#E91E63] mb-6 px-4"
            >
              POWER RANGER SPD ❤️
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1.5 }}
              className="text-3xl md:text-5xl font-display text-mela-gold drop-shadow-[0_0_10px_#FFD700] px-4"
            >
              duniya ke rakhwale 🫡
            </motion.h2>
          </motion.div>
        )}

        {/* Step 5: Final Screen */}
        {step === "end" && (
          <motion.div 
            key="end"
            className="z-10 flex flex-col items-center text-center w-full max-w-2xl px-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl w-full flex flex-col items-center">
              <h1 className="text-3xl md:text-5xl font-sans font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mb-10 uppercase tracking-widest leading-relaxed px-2">
                Happy Birthday<br/>Himanshu Ji
              </h1>
              
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                className="mb-12 space-y-4 font-sans font-light text-mela-cream/90"
              >
                <p className="text-xl md:text-2xl">Ab jao.</p>
                <p className="text-xl md:text-2xl">Birthday manao.</p>
                <p className="text-xl md:text-2xl italic">Aur photo bhejna mat bhoolna.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }}
                className="flex flex-col sm:flex-row gap-4 w-full"
              >
                <button 
                  onClick={handleDownload}
                  className="flex-1 py-4 bg-mela-red text-white font-sans font-bold tracking-widest uppercase rounded shadow-[0_0_15px_#D32F2F] hover:bg-mela-orange border border-white/20 transition-all"
                >
                  Download Photo
                </button>
                
                <button 
                  onClick={handleRestart}
                  className="flex-1 py-4 bg-transparent text-mela-gold font-sans font-bold tracking-widest uppercase rounded hover:bg-white/10 border border-mela-gold/50 transition-all"
                >
                  Replay Experience
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
}
