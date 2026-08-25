import { motion } from "motion/react";
import { useExperienceState } from "../state/experienceState";
import { SpotifySlide } from "../components/SpotifySlide";
import { StarShape, Squiggle } from "../components/Shapes";

export default function Hero() {
  const { setScene } = useExperienceState();

  return (
    <SpotifySlide 
      bgColor="var(--color-sp-black)"
      onNext={() => setScene("story")}
      nextText="START →"
      showCheckeredCorners={true}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
        {/* Floating Shapes */}
        <StarShape color="var(--color-sp-magenta)" className="absolute top-10 left-10 w-16 h-16" />
        <StarShape color="var(--color-sp-green)" className="absolute bottom-20 right-10 w-24 h-24" />
        <Squiggle color="var(--color-sp-blue)" className="absolute bottom-10 left-20 w-32 h-12" />

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="z-10 flex flex-col items-center"
        >
          <motion.div 
            className="bg-sp-blue text-sp-white font-sans font-bold px-4 py-1 text-sm uppercase -rotate-6 mb-4 border-2 border-black drop-shadow-[4px_4px_0_black]"
            animate={{ rotate: [-6, 0, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            IT'S YOUR DAY!
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-none tracking-tighter text-sp-white text-outline uppercase mb-2">
            HAPPY<br />
            <span className="text-sp-green text-outline">BIRTHDAY</span>
          </h1>
          
          <div className="bg-sp-magenta text-sp-black font-display font-bold text-3xl md:text-5xl px-6 py-2 mt-2 -rotate-2">
            HIMANSHU JI
          </div>
        </motion.div>
      </div>
    </SpotifySlide>
  );
}
