import gsap from "gsap";

/**
 * Checks if the user prefers reduced motion.
 * Returns true if the media query matches.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return false;
}

/**
 * Returns a time scale for GSAP.
 * 1.0 = normal speed
 * 0.01 = near-instant (for reduced motion)
 */
export function getGlobalTimeScale(): number {
  return prefersReducedMotion() ? 0.01 : 1.0;
}

/**
 * Applies the global time scale to GSAP globally.
 * Should be called once during app initialization or inside a listener.
 */
export function applyReducedMotionToGSAP() {
  gsap.globalTimeline.timeScale(getGlobalTimeScale());
}
