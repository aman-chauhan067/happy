import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useExperienceState } from "../state/experienceState";
import { photoBoothCaptions } from "../story/storyContent";

export default function PhotoBooth() {
  const { setScene, capturedPhotos, setCapturedPhotos } = useExperienceState();
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [cameraError, setCameraError] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isSequenceRunning = useRef(false);

  useEffect(() => {
    return () => { stopCamera(); };
  }, []);

  useEffect(() => {
    if (isActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      streamRef.current = stream;
      setIsActive(true);
      setCameraError(false);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraError(true);
    }
  };

  const startFakeCamera = () => {
    setCameraError(false);
    setIsActive(true);
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsActive(false);
  };

  const capturePhoto = () => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = 600;
        canvasRef.current.height = 450;
        if (videoRef.current && streamRef.current) {
          context.drawImage(videoRef.current, 0, 0, 600, 450);
        } else {
          context.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
          context.fillRect(0, 0, 600, 450);
          context.fillStyle = "black";
          context.font = "bold 40px sans-serif";
          context.textAlign = "center";
          context.fillText("No Camera", 300, 225);
        }
        return canvasRef.current.toDataURL('image/jpeg');
      }
    }
    return null;
  };

  const runPhotoSequence = async () => {
    if (isSequenceRunning.current) return;
    isSequenceRunning.current = true;
    setCapturedPhotos([]);
    const photos: string[] = [];
    
    for (let i = 0; i < 4; i++) {
      for (let c = 3; c > 0; c--) {
        setCountdown(c);
        await new Promise(r => setTimeout(r, 1000));
      }
      setCountdown(0);
      const photo = capturePhoto();
      if (photo) {
        photos.push(photo);
        setCapturedPhotos([...photos]); 
      }
      await new Promise(r => setTimeout(r, 500));
      setCountdown(null);
      await new Promise(r => setTimeout(r, 1000));
    }
    stopCamera();
    isSequenceRunning.current = false;
    setScene("result");
  };

  // Background colors cycle based on which photo we are on
  const bgColors = ['var(--color-sp-purple)', 'var(--color-sp-green)', 'var(--color-sp-magenta)', 'var(--color-sp-blue)', 'var(--color-sp-orange)'];
  const currentBg = isActive ? bgColors[capturedPhotos.length] : 'var(--color-sp-black)';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500 overflow-hidden"
      style={{ backgroundColor: currentBg }}
    >
      <div className="absolute inset-0 bg-checkered opacity-30 mix-blend-overlay"></div>

      <div className="z-10 w-full max-w-2xl flex flex-col items-center">
        {!isActive ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center text-center"
          >
            <h1 className="text-6xl md:text-8xl font-thin text-sp-white text-outline uppercase leading-none mb-4 tracking-tighter">
              PHOTO<br/>
              <span className="font-display font-bold">BOOTH</span>
            </h1>
            
            <div className="bg-sp-orange text-sp-black font-display font-bold px-6 py-2 -rotate-3 mb-2 shadow-[4px_4px_0_#000] border-2 border-sp-black uppercase">
              AB EK PHOTO TOH HONI CHAHIYE.
            </div>
            <div className="flex gap-2 mb-2">
              <div className="bg-sp-magenta text-sp-white font-display font-bold px-4 py-1 rotate-2 shadow-[4px_4px_0_#000] border-2 border-sp-black uppercase">AAPKI.</div>
              <div className="bg-sp-blue text-sp-white font-display font-bold px-4 py-1 -rotate-2 shadow-[4px_4px_0_#000] border-2 border-sp-black uppercase">MERI BHI.</div>
            </div>
            <div className="bg-sp-green text-sp-black font-thin px-4 py-1 mb-12 shadow-[4px_4px_0_#000] border-2 border-sp-black uppercase text-xl">
              aur preferably dono ki izzat bach jaye.
            </div>

            {cameraError ? (
              <button onClick={startFakeCamera} className="bg-sp-green text-sp-black font-bold uppercase tracking-widest px-8 py-4 rounded-full border-2 border-black hover:scale-105 transition-transform shadow-[4px_4px_0_#000]">
                CONTINUE WITHOUT CAMERA
              </button>
            ) : (
              <button onClick={startCamera} className="bg-sp-green text-sp-black font-bold uppercase tracking-widest px-8 py-4 rounded-full border-2 border-black hover:scale-105 transition-transform shadow-[4px_4px_0_#000]">
                OPEN BOOTH →
              </button>
            )}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center w-full relative">
            
            {/* Top Bar Navigation */}
            <div className="absolute -top-16 left-0 right-0 flex justify-between items-center w-full px-4 text-sp-black font-bold tracking-widest uppercase">
               <span>&lt; BACK</span>
               <span>{capturedPhotos.length + 1} / 4</span>
            </div>

            <div className="relative w-full aspect-[4/3] max-w-lg bg-sp-black border-4 border-sp-black shadow-[10px_10px_0_#000] overflow-hidden">
              {streamRef.current ? (
                <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover ${countdown === 0 ? 'brightness-200 grayscale' : 'grayscale'} transition-all duration-100 scale-x-[-1]`} />
              ) : (
                <div className={`w-full h-full flex items-center justify-center bg-checkered ${countdown === 0 ? 'brightness-200' : ''}`}>
                  <p className="text-sp-white text-3xl font-display font-bold bg-sp-black px-4 py-2">NO CAMERA DETECTED</p>
                </div>
              )}
              
              <AnimatePresence>
                {countdown !== null && (
                  <>
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute top-6 left-0 w-full text-center z-20">
                      <p className="font-display text-2xl font-bold uppercase text-sp-black bg-sp-white inline-block px-4 py-1 border-2 border-sp-black shadow-[4px_4px_0_#000] -rotate-2">
                        {photoBoothCaptions[capturedPhotos.length] || ""}
                      </p>
                    </motion.div>
                    
                    {countdown > 0 && (
                      <motion.div key={countdown} initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="absolute inset-0 flex items-center justify-center z-10">
                        <span className="text-[150px] font-thin text-sp-white text-outline">{countdown}</span>
                      </motion.div>
                    )}
                    {countdown === 0 && (
                      <motion.div key="snap" initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center z-10">
                         <div className="bg-sp-white text-sp-black font-bold text-5xl px-8 py-4 rotate-12 border-4 border-sp-black shadow-[8px_8px_0_#FF1493]">CLICK!</div>
                      </motion.div>
                    )}
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Shutter Button area */}
            <div className="w-full max-w-lg bg-sp-black h-20 flex items-center justify-between px-6 border-x-4 border-b-4 border-sp-black shadow-[10px_10px_0_#000]">
               <div className="w-8 h-8 opacity-50">⚡</div>
               {!isSequenceRunning.current && (
                 <button onClick={runPhotoSequence} className="w-12 h-12 rounded-full border-4 border-sp-orange bg-transparent flex items-center justify-center hover:scale-110 transition-transform">
                   <div className="w-8 h-8 rounded-full bg-sp-orange" />
                 </button>
               )}
               <div className="w-8 h-8 opacity-50 text-white flex items-center justify-center font-bold">C</div>
            </div>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </motion.div>
  );
}
