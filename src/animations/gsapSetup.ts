import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

// Register plugins globally
gsap.registerPlugin(ScrollTrigger, Observer);

export default gsap;
