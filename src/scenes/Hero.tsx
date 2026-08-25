import { motion } from "motion/react";
import { useExperienceState } from "../state/experienceState";
import { birthdayConfig } from "../config/birthdayConfig";
import melaNight from "../assets/mela_night.jpg";

export default function Hero() {
  const { setScene } = useExperienceState();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
      className="relative w-full h-screen bg-mela-night overflow-hidden flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${melaNight})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dark overlay to make text readable */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center text-center px-4 w-full max-w-2xl">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-sans font-bold tracking-[0.2em] text-mela-gold neon-text-gold uppercase mb-4"
        >
          Happy Birthday
        </motion.h1>

        <motion.h2
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-display text-mela-cream drop-shadow-[0_0_15px_#FFB347] mb-8 break-words text-center w-full px-2"
        >
          {birthdayConfig.recipientName} ✨
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 3, ease: "easeInOut" }}
          className="text-xl md:text-2xl font-sans italic text-mela-cream/90 mb-4"
        >
          Haan ji Himanshu Ji, aaj aapka din hai.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 4.5, ease: "easeInOut" }}
          className="text-xl md:text-2xl font-sans italic text-mela-cream/90 mb-16"
        >
          Toh thoda special treatment toh banta hai.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 6, ease: "backOut" }}
          whileHover={{ scale: 1.1, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setScene("story")}
          className="px-12 py-4 text-mela-cream font-display text-3xl tracking-wider bg-mela-red shadow-[0_0_20px_#D32F2F] transition-all hover:bg-mela-orange"
          style={{
            // Ticket shape
            clipPath: "polygon(10% 0, 100% 0, 100% 10%, 95% 50%, 100% 90%, 100% 100%, 0 100%, 0 90%, 5% 50%, 0 10%, 0 0)",
            border: "2px dashed #FFD700"
          }}
        >
          Enter Mela
        </motion.button>
      </div>
    </motion.div>
  );
}
