import { AnimatePresence } from 'motion/react'
import { ExperienceProvider, useExperienceState } from './state/experienceState'

import Hero from './scenes/Hero'
import Story from './scenes/Story'
import Reveal from './scenes/Reveal'
import PhotoBooth from './scenes/PhotoBooth'
import Finale from './scenes/Finale'

function SceneRouter() {
  const { scene } = useExperienceState();

  return (
    <AnimatePresence mode="wait">
      {scene === 'hero' && <Hero key="hero" />}
      {scene === 'story' && <Story key="story" />}
      {scene === 'reveal' && <Reveal key="reveal" />}
      {scene === 'photo-booth' && <PhotoBooth key="photo-booth" />}
      {scene === 'result' && <Finale key="result" />}
    </AnimatePresence>
  );
}

function App() {
  return (
    <ExperienceProvider>
      <SceneRouter />
    </ExperienceProvider>
  )
}

export default App
