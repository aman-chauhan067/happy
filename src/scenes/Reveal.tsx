import { motion } from "motion/react";
import { useExperienceState } from "../state/experienceState";
import { SpotifySlide } from "../components/SpotifySlide";
import { StarShape, Pill } from "../components/Shapes";

export default function Reveal() {
  const { setScene, storyIndex } = useExperienceState();

  return (
    <SpotifySlide 
      bgColor="var(--color-sp-green)"
      slideNumber={storyIndex + 2}
      totalSlides={8} 
      onNext={() => setScene("photo-booth")}
      nextText="CHALO FIX KARTE HAIN →"
      showCheckeredCorners={false}
    >
      <div className="relative w-full h-full flex flex-col justify-center px-4 md:px-12">
        <StarShape color="var(--color-sp-magenta)" className="absolute right-10 top-1/4 w-32 h-32" />
        
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="z-10"
        >
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-none uppercase max-w-4xl tracking-tight text-sp-black mb-4">
            BUT...
          </h2>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <Pill text="ITNA SAB HO GAYA." bgColor="var(--color-sp-black)" textColor="var(--color-sp-white)" />
            <Pill text="DELHI." bgColor="var(--color-sp-blue)" textColor="var(--color-sp-white)" />
            <Pill text="METRO." bgColor="var(--color-sp-magenta)" textColor="var(--color-sp-white)" />
            <Pill text="BAATEIN." bgColor="var(--color-sp-orange)" textColor="var(--color-sp-black)" />
            <Pill text="BAIZATTI." bgColor="var(--color-sp-purple)" textColor="var(--color-sp-white)" />
            <Pill text="CARE." bgColor="var(--color-sp-black)" textColor="var(--color-sp-white)" />
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="mt-6 flex flex-col items-start gap-2"
          >
            <span className="inline-block px-4 py-2 bg-sp-magenta text-sp-white font-display font-bold uppercase tracking-widest text-lg md:text-3xl -rotate-2">
              MERE PAAS... AAPKI... EK BHI...
            </span>
            <span className="inline-block px-4 py-2 bg-sp-black text-sp-white font-display font-bold uppercase tracking-widest text-2xl md:text-5xl rotate-1">
              PHOTO NAHI HAI. 😭
            </span>
          </motion.div>

          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1 }}
             className="mt-8 font-thin text-xl md:text-2xl text-sp-black max-w-lg"
          >
            Ye dosti ka documentation department itna bekaar kaise hai?
          </motion.p>
        </motion.div>
      </div>
    </SpotifySlide>
  );
}
