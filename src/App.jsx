import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import HeroPage from './components/HeroPage';
import SecondSection from './components/SecondSection';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import HorizontalSection from './components/HorizontalSection';

function App() {
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);

  // Track how far hero has scrolled off screen
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Subtle, elegant transforms — hero content drifts up and fades
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const heroBlur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(20px)']);

  return (
    <div className={`relative w-full bg-[#000] ${loading ? 'overflow-hidden h-screen' : ''}`}>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Sticky Hero — content drifts upward and fades as you scroll */}
      <div ref={heroRef} className="sticky top-0 h-screen w-full overflow-hidden z-0">
        <motion.div
          style={{
            y: heroY,
            opacity: heroOpacity,
            scale: heroScale,
            filter: heroBlur,
          }}
          className="w-full h-full"
        >
          <HeroPage ready={!loading} />
        </motion.div>
      </div>

      {/* Second Section slides over the hero with a premium rounded edge */}
      <div className="relative z-10 w-full">
        <SecondSection />
        <HorizontalSection />
        <Footer />
      </div>
    </div>
  );
}

export default App;
