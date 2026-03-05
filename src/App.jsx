import { useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import DigitalMarketScreen from './components/DigitalMarketScreen';
import DeveloperScreen from './components/DeveloperScreen';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import HeroPage from './components/HeroPage';
import HorizontalSection from './components/HorizontalSection';
import MapPage from './components/MapPage';
import Navigation from './components/Navigation';
import Preloader from './components/Preloader';
import SecondSection from './components/SecondSection';
import TransparencySecurityScreen from './components/TransparencySecurityScreen';

function IntroSequence() {
  const sequenceRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sequenceRef,
    offset: ['start start', 'end end'],
  });
  const heroProgress = useTransform(scrollYProgress, [0, 0.2], [0, 0.15]);

  // Robust sequencing using z-index and display
  const heroZ = useTransform(scrollYProgress, [0, 0.2, 0.25], [10, 10, 0]);
  const heroDisplay = useTransform(scrollYProgress, (v) => v < 0.25 ? 'block' : 'none');

  const secondZ = useTransform(scrollYProgress, [0, 0.15, 0.2, 0.5, 0.55], [0, 0, 20, 20, 0]);
  const secondDisplay = useTransform(scrollYProgress, (v) => v > 0.15 && v < 0.55 ? 'block' : 'none');

  const horizontalZ = useTransform(scrollYProgress, [0, 0.45, 0.5], [0, 0, 30]);
  const horizontalDisplay = useTransform(scrollYProgress, (v) => v > 0.45 ? 'block' : 'none');

  return (
    <section ref={sequenceRef} className="relative h-[1200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ zIndex: heroZ, display: heroDisplay }} className="absolute inset-0">
          <HeroPage progress={heroProgress} />
        </motion.div>
        <motion.div style={{ zIndex: secondZ, display: secondDisplay }} className="absolute inset-0">
          <SecondSection progress={scrollYProgress} />
        </motion.div>
        <motion.div style={{ zIndex: horizontalZ, display: horizontalDisplay }} className="absolute inset-0">
          <HorizontalSection progress={scrollYProgress} />
        </motion.div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <div className="bg-[#111638] min-h-screen">
      <IntroSequence />
      <DigitalMarketScreen />
      <DeveloperScreen />
      <TransparencySecurityScreen />
      <FAQSection />
      <Footer />
    </div>
  );
}

function AppShell() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      {showPreloader ? <Preloader onComplete={() => setShowPreloader(false)} /> : null}
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
