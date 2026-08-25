import React, { createContext, useContext, useState, type ReactNode } from "react";

export type ExperienceScene = "hero" | "story" | "reveal" | "photo-booth" | "result";

interface ExperienceState {
  scene: ExperienceScene;
  setScene: (scene: ExperienceScene) => void;
  storyIndex: number;
  setStoryIndex: (index: number) => void;
  capturedPhotos: string[]; // Base64 data URLs
  setCapturedPhotos: React.Dispatch<React.SetStateAction<string[]>>;
}

const ExperienceStateContext = createContext<ExperienceState | undefined>(undefined);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [scene, setScene] = useState<ExperienceScene>("hero");
  const [storyIndex, setStoryIndex] = useState(0);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);

  return (
    <ExperienceStateContext.Provider value={{
      scene,
      setScene,
      storyIndex,
      setStoryIndex,
      capturedPhotos,
      setCapturedPhotos
    }}>
      {children}
    </ExperienceStateContext.Provider>
  );
}

export function useExperienceState() {
  const context = useContext(ExperienceStateContext);
  if (!context) {
    throw new Error("useExperienceState must be used within an ExperienceProvider");
  }
  return context;
}
