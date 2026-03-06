import { useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import UrbanActivityScreen from './components/DigitalMarketScreen';
import CityLayerSection from './components/CityLayerSection';
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
import CityMapScreen from './components/CityMapScreen';
import PropertyOverviewSection from './components/PropertyOverviewSection';
import LaunchPhaseSection from './components/LaunchPhaseSection';
import LiveActivityEnvironment from './components/LiveActivityEnvironment';

function IntroSequence({ preloaderActive }) {
  const sequenceRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sequenceRef,
    offset: ['start start', 'end end'],
  });
  const heroProgress = useTransform(scrollYProgress, [0, 0.2], [0, 0.15]);

  // Robust sequencing - Giving SecondSection more room
  const heroZ = useTransform(scrollYProgress, [0, 0.2, 0.25], [10, 10, 0]);
  const heroDisplay = useTransform(scrollYProgress, (v) => v < 0.25 ? 'block' : 'none');

  const secondZ = useTransform(scrollYProgress, [0, 0.15, 0.2, 0.7, 0.75], [0, 0, 20, 20, 0]);
  const secondDisplay = useTransform(scrollYProgress, (v) => v > 0.15 && v < 0.75 ? 'block' : 'none');

  const horizontalZ = useTransform(scrollYProgress, [0, 0.65, 0.7], [0, 0, 30]);
  const horizontalDisplay = useTransform(scrollYProgress, (v) => v > 0.6 ? 'block' : 'none');

  return (
    <section ref={sequenceRef} className="relative h-[1200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ zIndex: heroZ, display: heroDisplay }} className="absolute inset-0">
          <HeroPage progress={heroProgress} preloaderActive={preloaderActive} />
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

function HomePage({ preloaderActive }) {
  return (
    <div className="bg-[#111638] min-h-screen">
      <IntroSequence preloaderActive={preloaderActive} />
      <CityLayerSection />
      <PropertyOverviewSection />
      <LaunchPhaseSection />
      <UrbanActivityScreen />
      <DeveloperScreen />
      <TransparencySecurityScreen />
      <LiveActivityEnvironment />
      <CityMapScreen />
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
        <Route path="/" element={<HomePage preloaderActive={showPreloader} />} />
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
