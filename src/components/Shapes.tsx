import { motion } from 'motion/react';

// Reusable Quirky Shapes

export const StarShape = ({ color, className }: { color: string, className?: string }) => (
  <motion.svg viewBox="0 0 100 100" className={className} animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
    <path d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z" fill={color} />
  </motion.svg>
);

export const FlowerShape = ({ color, className }: { color: string, className?: string }) => (
  <motion.svg viewBox="0 0 100 100" className={className} animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}>
    <path d="M50 10 C60 10, 65 25, 75 25 C85 25, 90 40, 90 50 C90 60, 85 75, 75 75 C65 75, 60 90, 50 90 C40 90, 35 75, 25 75 C15 75, 10 60, 10 50 C10 40, 15 25, 25 25 C35 25, 40 10, 50 10 Z" fill={color} />
    {/* Smiley Face inside flower */}
    <circle cx="35" cy="45" r="5" fill="#000" />
    <circle cx="65" cy="45" r="5" fill="#000" />
    <path d="M35 60 Q50 75 65 60" stroke="#000" strokeWidth="5" fill="none" strokeLinecap="round" />
  </motion.svg>
);

export const Pill = ({ text, bgColor, textColor, className }: { text: string, bgColor: string, textColor: string, className?: string }) => (
  <motion.div 
    whileHover={{ scale: 1.05, rotate: Math.random() * 10 - 5 }}
    className={`inline-block px-4 py-2 rounded-full font-sans font-bold uppercase tracking-wider text-sm border-2 border-sp-black ${className}`}
    style={{ backgroundColor: bgColor, color: textColor, boxShadow: "4px 4px 0px #000" }}
  >
    {text}
  </motion.div>
);

export const Squiggle = ({ color, className }: { color: string, className?: string }) => (
  <svg viewBox="0 0 200 50" className={className}>
    <path d="M0 25 Q25 0 50 25 T100 25 T150 25 T200 25" fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
