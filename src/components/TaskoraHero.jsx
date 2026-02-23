import { memo, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import Hls from 'hls.js';

const VIDEO_SRC =
  'https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8';

const navLinks = [
  { label: 'Features', active: true },
  { label: 'Insights' },
  { label: 'About' },
  { label: 'Case Studies', strike: true },
  { label: 'Contact' },
];

const badges = [
  { label: 'Integrated with', icon: 'layers' },
  { label: 'Integrated with', icon: 'bolt' },
  { label: 'Integrated with', icon: 'orbit' },
];

const logoMarks = [
  'Helix',
  'Orbit',
  'Aether',
  'Nova',
  'Vector',
  'Pulse',
];

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
    },
  },
};

const badgeRowVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: 'easeOut' },
  },
};

const VideoPlayer = memo(function VideoPlayer() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    let hls;
    const handleLoadedMetadata = () => {
      video.play().catch(() => undefined);
    };

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
      });
      hls.loadSource(VIDEO_SRC);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, handleLoadedMetadata);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = VIDEO_SRC;
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeAttribute('src');
      video.load();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
});

function BadgeIcon({ type }) {
  if (type === 'layers') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3l8 4-8 4-8-4 8-4Zm0 8 8 4-8 4-8-4 8-4Z"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === 'bolt') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M13 2 5 14h6l-1 8 9-13h-6l1-7Z"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="1.4" />
      <path
        d="M12 4c4.4 2.2 6.6 6.3 6.6 8.4 0 2.1-2.2 6.2-6.6 8.4"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LogoMark({ label }) {
  return (
    <div className="flex items-center gap-3">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="28" height="28" rx="8" stroke="currentColor" strokeWidth="2" />
        <path
          d="M9 17c2.6-5 12.4-5 16 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-sm font-medium uppercase tracking-[0.2em] text-white/70">
        {label}
      </span>
    </div>
  );
}

export default function TaskoraHero() {
  return (
    <div className="min-h-screen bg-black text-white">
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed left-1/2 top-6 z-50 w-[92%] max-w-6xl -translate-x-1/2"
      >
        <div className="rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-6">
            <div className="text-lg font-medium tracking-tight text-white">Synapse</div>
            <div className="hidden items-center gap-6 text-sm text-white/70 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href="#"
                  className={`relative px-3 py-1 transition ${
                    link.strike ? 'line-through decoration-white/40' : ''
                  } ${link.active ? 'text-white' : 'hover:text-white'}`}
                >
                  {link.active ? (
                    <span className="relative inline-flex">
                      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/80 via-white/30 to-white/70" />
                      <span className="relative z-10 rounded-full bg-black/80 px-3 py-1">
                        {link.label}
                      </span>
                    </span>
                  ) : (
                    link.label
                  )}
                </a>
              ))}
            </div>
            <button className="hidden rounded-full bg-gradient-to-r from-white via-gray-200 to-gray-300 px-5 py-2 text-sm font-semibold text-black shadow-[0_12px_30px_rgba(255,255,255,0.18)] transition hover:shadow-[0_16px_40px_rgba(255,255,255,0.25)] md:inline-flex">
              Get Started for Free
            </button>
          </div>
        </div>
      </motion.nav>

      <section className="relative min-h-screen overflow-hidden pb-24 pt-32">
        <div className="pointer-events-none absolute left-0 right-0 bottom-[35vh] h-[80vh] overflow-hidden opacity-100">
          <VideoPlayer />
        </div>

        <main className="relative z-10 mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center px-6 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col items-center"
          >
            <motion.div
              variants={badgeRowVariants}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              {badges.map((badge, index) => (
                <motion.div
                  key={`${badge.icon}-${index}`}
                  variants={fadeUp}
                  className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.25em] text-white/80 backdrop-blur"
                >
                  <span>{badge.label}</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/10">
                    <BadgeIcon type={badge.icon} />
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-10 text-[44px] font-semibold leading-[1.03] tracking-tight text-white sm:text-[64px] lg:text-[80px]"
            >
              Where Innovation Meets Execution
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
            >
              <span className="block">Test every release in minutes, not days.</span>
              <span className="block">Deploy confidently with automated pipelines and real-time visibility.</span>
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button className="inline-flex items-center justify-center rounded-full border border-white/70 bg-black px-7 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition hover:border-white hover:bg-white/10">
                Get Started for Free
              </button>
              <button className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-3 text-sm font-semibold text-white/80 backdrop-blur transition hover:border-white/40 hover:text-white">
                Let's Get Connected
              </button>
            </motion.div>
          </motion.div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-10 text-white/70">
            {logoMarks.map((label) => (
              <div key={label} className="opacity-40 grayscale">
                <LogoMark label={label} />
              </div>
            ))}
          </div>
        </main>
      </section>
    </div>
  );
}
