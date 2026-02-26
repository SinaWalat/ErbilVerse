import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import HeroPage from './components/HeroPage';
import SecondSection from './components/SecondSection';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import HorizontalSection from './components/HorizontalSection';
import CityMapScreen from './components/CityMapScreen';
import PropertyInformation from './components/PropertyInformation';
import DigitalMarketScreen from './components/DigitalMarketScreen';
import DeveloperScreen from './components/DeveloperScreen';
import TransparencySecurityScreen from './components/TransparencySecurityScreen';

function App() {
  const [loading, setLoading] = useState(true);
  // Track how far hero has scrolled off screen (Removed old heroRef)

  const unifiedScrollRef = useRef(null);
  const { scrollYProgress: unifiedProgress } = useScroll({
    target: unifiedScrollRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className={`relative w-full bg-[#111638] ${loading ? 'overflow-hidden h-screen' : ''}`}>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 
        Full-Page Unified Cinematic Scene Dissolve
        This provides the massive 1200vh track for all 3 major scenes. 
        It is reduced to 800vh on mobile to keep the required scroll action responsive and shorter.
      */}
      <div ref={unifiedScrollRef} className="relative z-10 w-full h-[800vh] md:h-[1200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#111638]">

          {/* Layer 0: The Hero Scene */}
          <div className="absolute inset-0 z-0">
            <HeroPage ready={!loading} progress={unifiedProgress} />
          </div>

          {/* Layer 1: The Dark Scene (Text Reveal) */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <SecondSection progress={unifiedProgress} />
          </div>

          {/* Layer 2: The Bright Scene (Horizontal Scroll) */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <HorizontalSection progress={unifiedProgress} />
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-[#fcfcfc]">
        <CityMapScreen />
        {/* <PropertyInformation /> */}
        <DigitalMarketScreen />
        {/* <DeveloperScreen /> */}
        {/* <TransparencySecurityScreen /> */}
      </div>

      <div className="relative z-30 w-full bg-[#111638]">
        <Footer />
      </div>
    </div >
  );
}

export default App;
