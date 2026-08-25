import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useExperienceState } from "../state/experienceState";
import { photoBoothCaptions } from "../story/storyContent";
import melaBooth from "../assets/mela_booth.jpg";

export default function PhotoBooth() {
  const { setScene, capturedPhotos, setCapturedPhotos } = useExperienceState();
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [cameraError, setCameraError] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  // Using a ref to track if sequence is running to prevent duplicate executions
  const isSequenceRunning = useRef(false);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" },
        audio: false 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
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
          // Fallback: draw a colorful placeholder
          context.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`;
          context.fillRect(0, 0, 600, 450);
          context.fillStyle = "white";
          context.font = "bold 40px sans-serif";
          context.textAlign = "center";
          context.fillText("No Camera 📸", 300, 225);
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
      // Countdown
      for (let c = 3; c > 0; c--) {
        setCountdown(c);
        await new Promise(r => setTimeout(r, 1000));
      }
      setCountdown(0); // Snap!
      
      const photo = capturePhoto();
      if (photo) {
        photos.push(photo);
        // Force update global state here inside loop so UI can react if needed
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

  const currentCaption = countdown !== null && capturedPhotos.length < photoBoothCaptions.length 
    ? photoBoothCaptions[capturedPhotos.length] 
    : "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-screen flex flex-col items-center justify-center p-4 bg-mela-night overflow-hidden"
      style={{
        backgroundImage: `url(${melaBooth})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      <div className="z-10 w-full max-w-lg flex flex-col items-center">
        
        {/* Main Interface */}
        {!isActive ? (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full bg-black/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center"
          >
            <h2 className="text-2xl md:text-3xl font-display text-mela-gold mb-4">
              {cameraError ? "Arre, camera permission denied?" : "Aaj ke baad kam se kam ek photo toh honi chahiye."}
            </h2>
            <p className="text-lg font-sans text-mela-cream/90 mb-10">
              {cameraError 
                ? "Koi baat nahi, bina camera ke hi photo click kar lete hain. Imagination is everything." 
                : "Aur kyunki ye aapka birthday hai... camera bhi aap hi handle karoge."}
            </p>
            
            {cameraError ? (
              <button
                onClick={startFakeCamera}
                className="px-8 py-4 bg-mela-red text-white font-sans font-bold tracking-widest uppercase rounded-lg shadow-[0_0_20px_#D32F2F] hover:bg-mela-orange transition-all border border-white/20"
              >
                Continue Anyway
              </button>
            ) : (
              <button
                onClick={startCamera}
                className="px-8 py-4 bg-mela-red text-white font-sans font-bold tracking-widest uppercase rounded-lg shadow-[0_0_20px_#D32F2F] hover:bg-mela-orange transition-all border border-white/20"
              >
                Enable Camera
              </button>
            )}
          </motion.div>
        ) : (
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/80 shadow-[0_0_40px_#FFD700] border-4 border-mela-gold">
            {streamRef.current ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${countdown === 0 ? 'brightness-200' : ''} transition-all duration-100 scale-x-[-1]`}
              />
            ) : (
              <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-mela-red to-mela-orange ${countdown === 0 ? 'brightness-200' : ''} transition-all duration-100`}>
                <p className="text-white text-2xl font-display font-bold">Imagination Camera 📸</p>
              </div>
            )}
            
            <AnimatePresence>
              {countdown !== null && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-6 left-0 w-full text-center z-20"
                  >
                    <p className="font-display text-3xl md:text-4xl text-mela-cream drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-4 bg-black/40 inline-block py-2 rounded-full backdrop-blur-md">
                      {currentCaption}
                    </p>
                  </motion.div>
                  
                  {countdown > 0 && (
                    <motion.div
                      key={countdown}
                      initial={{ scale: 2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center z-10"
                    >
                      <span className="text-[120px] font-sans font-black text-white drop-shadow-[0_0_20px_#E91E63]">{countdown}</span>
                    </motion.div>
                  )}
                </>
              )}
            </AnimatePresence>

            {!isSequenceRunning.current && (
              <div className="absolute bottom-6 left-0 w-full flex justify-center z-20">
                <button
                  onClick={runPhotoSequence}
                  className="w-16 h-16 rounded-full bg-white border-4 border-mela-red hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center group"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-mela-red group-hover:bg-mela-red transition-colors" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Progress Dots */}
        <div className="flex gap-3 mt-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                i < capturedPhotos.length 
                  ? "bg-mela-gold border-mela-gold shadow-[0_0_10px_#FFD700]" 
                  : "bg-transparent border-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </motion.div>
  );
}
