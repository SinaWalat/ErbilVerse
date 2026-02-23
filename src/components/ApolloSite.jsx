import { useEffect, useRef } from 'react';

const events = [
  {
    date: 'FEB 14',
    title: 'Lunar Transmission',
    time: '22:00 - 06:00',
    genre: 'Deep techno · Hypnotic set',
    status: 'Sold Out',
  },
  {
    date: 'FEB 21',
    title: 'Eclipse Ritual',
    time: '23:00 - 07:00',
    genre: 'Industrial pulse · Live hardware',
    status: 'Limited',
  },
  {
    date: 'MAR 06',
    title: 'Stellar Drift',
    time: '22:00 - 05:00',
    genre: 'Cinematic techno · Space choir',
    status: 'Tickets',
  },
];

const residents = [
  {
    name: 'Nyx',
    style: 'Shadow techno · 128 BPM',
    residency: 'Friday resident',
  },
  {
    name: 'Vanta',
    style: 'Raw warehouse pressure',
    residency: 'Saturday resident',
  },
  {
    name: 'Echo-7',
    style: 'Cosmic ambient transitions',
    residency: 'Sunday ritual',
  },
];

const gallery = [
  {
    title: 'Orbital bar',
    src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Neon chamber',
    src: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Midnight floor',
    src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'VIP glass vault',
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
  },
];

export default function ApolloSite() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const listeners = [];
    const on = (element, event, handler, options) => {
      element.addEventListener(event, handler, options);
      listeners.push(() => element.removeEventListener(event, handler, options));
    };

    const splitText = (element) => {
      if (!element || element.dataset.splitReady === 'true') return;
      const text = element.textContent || '';
      element.dataset.splitReady = 'true';
      element.setAttribute('aria-label', text);
      element.textContent = '';
      text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.className = 'split-char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.setAttribute('aria-hidden', 'true');
        element.appendChild(span);
      });
    };

    const splitTargets = root.querySelectorAll('[data-split]');
    splitTargets.forEach(splitText);

    const animateChars = (element, { duration = 1100, stagger = 30, from, to }) => {
      if (!element || element.dataset.animated === 'true') return;
      element.dataset.animated = 'true';
      const chars = element.querySelectorAll('.split-char');
      chars.forEach((char, index) => {
        if (!char.animate) {
          char.style.opacity = '1';
          char.style.transform = 'translateY(0)';
          char.style.filter = 'none';
          return;
        }
        const animation = char.animate([from, to], {
          duration,
          delay: index * stagger,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'forwards',
        });
        animation.onfinish = () => {
          char.style.opacity = '1';
          char.style.transform = 'translateY(0)';
          char.style.filter = 'none';
        };
      });
    };

    const heroTitle = root.querySelector('[data-split="apollo"]');
    if (heroTitle) {
      heroTitle.style.perspective = '1200px';
      if (!prefersReducedMotion) {
        animateChars(heroTitle, {
          duration: 1400,
          stagger: 60,
          from: {
            transform: 'translateY(120%) rotateX(-80deg)',
            opacity: 0,
            filter: 'blur(10px)',
          },
          to: { transform: 'translateY(0) rotateX(0)', opacity: 1, filter: 'blur(0px)' },
        });
      } else {
        heroTitle.querySelectorAll('.split-char').forEach((char) => {
          char.style.opacity = '1';
        });
      }
    }

    const revealTargets = root.querySelectorAll('.reveal');
    const splitHeadings = Array.from(root.querySelectorAll('[data-split]')).filter(
      (element) => element.dataset.split !== 'apollo'
    );

    const revealElement = (element) => {
      if (element.dataset.revealed === 'true') return;
      element.dataset.revealed = 'true';
      element.classList.add('is-visible');
      if (!element.animate) {
        element.style.opacity = '1';
        element.style.transform = '';
        return;
      }
      const animation = element.animate(
        [
          { opacity: 0, transform: 'translateY(32px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        { duration: 900, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }
      );
      animation.onfinish = () => {
        element.style.opacity = '1';
        element.style.transform = '';
      };
    };

    let revealObserver;
    let splitObserver;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealElement(entry.target);
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      revealTargets.forEach((element) => revealObserver.observe(element));

      splitObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            animateChars(entry.target, {
              duration: 1000,
              stagger: 20,
              from: { transform: 'translateY(120%)', opacity: 0 },
              to: { transform: 'translateY(0)', opacity: 1 },
            });
            splitObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.35 }
      );
      splitHeadings.forEach((element) => splitObserver.observe(element));
    } else {
      revealTargets.forEach((element) => {
        element.classList.add('is-visible');
        element.style.opacity = '1';
      });
      splitHeadings.forEach((element) => {
        element.dataset.animated = 'true';
        element.querySelectorAll('.split-char').forEach((char) => {
          char.style.opacity = '1';
          char.style.transform = 'translateY(0)';
        });
      });
    }

    if (!prefersReducedMotion) {
      const scroller = root.querySelector('.apollo-main');
      const parallaxItems = Array.from(root.querySelectorAll('[data-parallax]')).map(
        (element) => ({
          element,
          speed: Number(element.dataset.parallax || 0.25),
        })
      );
      if (scroller && parallaxItems.length) {
        let ticking = false;
        const updateParallax = () => {
          const scrollerRect = scroller.getBoundingClientRect();
          const viewportHeight = scroller.clientHeight;
          parallaxItems.forEach(({ element, speed }) => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top - scrollerRect.top;
            const progress =
              (elementTop - viewportHeight) / (-rect.height - viewportHeight);
            const clamped = Math.min(Math.max(progress, 0), 1);
            const offset = -120 * speed * clamped;
            element.style.transform = `translate3d(0, ${offset}px, 0)`;
          });
          ticking = false;
        };
        const onScroll = () => {
          if (ticking) return;
          ticking = true;
          requestAnimationFrame(updateParallax);
        };
        on(scroller, 'scroll', onScroll, { passive: true });
        on(window, 'resize', updateParallax);
        updateParallax();
      }

      const magneticButtons = root.querySelectorAll('.magnetic');
      magneticButtons.forEach((button) => {
        button.style.transition = 'transform 0.25s ease-out';
        const strength = Number(button.dataset.magnet || 18);
        const handleMove = (event) => {
          const rect = button.getBoundingClientRect();
          const x = event.clientX - rect.left - rect.width / 2;
          const y = event.clientY - rect.top - rect.height / 2;
          button.style.transform = `translate3d(${x / strength}px, ${y / strength}px, 0)`;
        };
        const handleLeave = () => {
          button.style.transform = 'translate3d(0, 0, 0)';
        };
        on(button, 'pointermove', handleMove);
        on(button, 'pointerleave', handleLeave);
        on(button, 'pointerdown', handleLeave);
      });

      const tiltCards = root.querySelectorAll('.tilt');
      tiltCards.forEach((card) => {
        card.style.transition = 'transform 0.35s ease-out';
        const handleMove = (event) => {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = `rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
        };
        const handleLeave = () => {
          card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        };
        on(card, 'pointermove', handleMove);
        on(card, 'pointerleave', handleLeave);
      });
    }

    const glowCards = root.querySelectorAll('.glow-card');
    glowCards.forEach((card) => {
      const handleMove = (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--x', `${x}%`);
        card.style.setProperty('--y', `${y}%`);
      };
      const handleLeave = () => {
        card.style.setProperty('--x', '50%');
        card.style.setProperty('--y', '50%');
      };
      on(card, 'pointermove', handleMove);
      on(card, 'pointerleave', handleLeave);
    });

    return () => {
      listeners.forEach((cleanup) => cleanup());
      if (revealObserver) revealObserver.disconnect();
      if (splitObserver) splitObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d');
    if (!context) return undefined;

    let animationFrame = null;
    let width = 0;
    let height = 0;
    let stars = [];

    const createStar = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.3,
      speed: Math.random() * 0.35 + 0.15,
      alpha: Math.random() * 0.6 + 0.2,
    });

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: 140 }, createStar);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const gradient = context.createRadialGradient(
        width * 0.45,
        height * 0.3,
        0,
        width * 0.45,
        height * 0.3,
        width
      );
      gradient.addColorStop(0, 'rgba(53, 161, 255, 0.12)');
      gradient.addColorStop(0.45, 'rgba(123, 75, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(3, 3, 9, 0.95)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > height + 10) {
          star.y = -10;
          star.x = Math.random() * width;
        }
        context.beginPath();
        context.fillStyle = `rgba(185, 198, 255, ${star.alpha})`;
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fill();
      });

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="apollo-app" ref={rootRef}>
      <div className="noise-layer" aria-hidden="true" />
      <header className="apollo-nav">
        <div className="nav-shell glass-panel">
          <div className="logo">APOLLO</div>
          <nav className="nav-links" aria-label="Primary">
            <a href="#events">Events</a>
            <a href="#residents">Resident DJs</a>
            <a href="#gallery">Gallery</a>
            <a href="#vip">VIP</a>
            <a href="#location">Location</a>
          </nav>
          <button className="btn tiny ghost magnetic" data-magnet="14">
            <span className="btn-label">Reserve</span>
          </button>
        </div>
      </header>

      <main className="apollo-main">
        <section id="hero" className="section hero">
          <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orbit" data-parallax="0.35" aria-hidden="true" />
          <div className="hero-orb" data-parallax="0.2" aria-hidden="true" />

          <div className="hero-content">
            <p className="eyebrow reveal">Berlin underground · cinematic space techno</p>
            <h1 className="hero-title" data-split="apollo">
              APOLLO
            </h1>
            <p className="hero-subtitle reveal">
              An exclusive techno bar where gravity softens, basslines deepen, and the night
              becomes a cinematic ritual. Enter the black glass sanctuary.
            </p>
            <div className="hero-cta reveal">
              <button className="btn primary magnetic" data-magnet="12">
                <span className="btn-label">VIP Reservations</span>
              </button>
              <button className="btn ghost magnetic" data-magnet="16">
                <span className="btn-label">Explore Events</span>
              </button>
            </div>
            <div className="hero-stats reveal">
              <div>
                <span className="stat-label">Doors</span>
                <span className="stat-value">22:00 - Dawn</span>
              </div>
              <div>
                <span className="stat-label">Dress</span>
                <span className="stat-value">All black · Chrome detail</span>
              </div>
              <div>
                <span className="stat-label">Capacity</span>
                <span className="stat-value">280 souls</span>
              </div>
            </div>
          </div>
        </section>

        <section id="events" className="section">
          <div className="section-heading">
            <span className="tag">Upcoming</span>
            <h2 data-split>Events</h2>
            <p className="section-subtitle reveal">
              Ritual nights engineered with precision sound, immersive light, and hypnotic pacing.
            </p>
          </div>
          <div className="card-grid">
            {events.map((event) => (
              <article
                key={event.title}
                className="event-card glass-card glow-card tilt reveal"
              >
                <div className="event-date">{event.date}</div>
                <h3>{event.title}</h3>
                <p className="event-time">{event.time}</p>
                <p className="event-genre">{event.genre}</p>
                <span className="pill">{event.status}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="residents" className="section">
          <div className="section-heading">
            <span className="tag">Residents</span>
            <h2 data-split>Resident DJs</h2>
            <p className="section-subtitle reveal">
              Curated artists sculpting the sonic identity of APOLLO, night after night.
            </p>
          </div>
          <div className="card-grid residents">
            {residents.map((dj) => (
              <article key={dj.name} className="dj-card glass-card glow-card tilt reveal">
                <div className="dj-avatar" aria-hidden="true" />
                <div>
                  <h3>{dj.name}</h3>
                  <p className="dj-style">{dj.style}</p>
                  <span className="pill ghost">{dj.residency}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="gallery" className="section">
          <div className="section-heading">
            <span className="tag">Atmosphere</span>
            <h2 data-split>Gallery</h2>
            <p className="section-subtitle reveal">
              Glass, chrome, and infrared halos. Step into a cinematic underworld.
            </p>
          </div>
          <div className="gallery-grid">
            {gallery.map((item, index) => (
              <figure
                key={`${item.title}-${index}`}
                className="gallery-item glow-card reveal"
              >
                <img src={item.src} alt={item.title} loading="lazy" />
                <div className="gallery-overlay">
                  <span>{item.title}</span>
                </div>
              </figure>
            ))}
          </div>
        </section>

        <section id="vip" className="section">
          <div className="section-heading">
            <span className="tag">Exclusive Access</span>
            <h2 data-split>VIP Reservations</h2>
            <p className="section-subtitle reveal">
              Private booths, bottle service, and orbital views of the main floor.
            </p>
          </div>
          <div className="vip-layout">
            <div className="vip-copy glass-card reveal">
              <h3>Orbital Table</h3>
              <p>
                Minimum spend from €900. Includes dedicated host, private entry lane, and
                cinematic sightlines.
              </p>
              <div className="vip-perks">
                <div>
                  <span className="stat-label">Capacity</span>
                  <span className="stat-value">6 - 10 guests</span>
                </div>
                <div>
                  <span className="stat-label">Curated</span>
                  <span className="stat-value">Bottle ritual</span>
                </div>
              </div>
            </div>
            <form className="vip-form glass-card reveal">
              <label>
                Full name
                <input type="text" placeholder="Your name" />
              </label>
              <label>
                Contact
                <input type="email" placeholder="Email or phone" />
              </label>
              <label>
                Date
                <input type="text" placeholder="Preferred night" />
              </label>
              <label>
                Party size
                <input type="number" min="2" max="12" placeholder="Number of guests" />
              </label>
              <button className="btn primary magnetic" type="button">
                <span className="btn-label">Request VIP</span>
              </button>
            </form>
          </div>
        </section>

        <section id="location" className="section">
          <div className="section-heading">
            <span className="tag">Coordinates</span>
            <h2 data-split>Location</h2>
            <p className="section-subtitle reveal">
              Hidden beneath the rails of Friedrichshain. Access via the black glass tunnel.
            </p>
          </div>
          <div className="location-grid">
            <div className="map-panel glass-card reveal">
              <div className="map-glow" data-parallax="0.18" aria-hidden="true" />
              <div className="map-lines" aria-hidden="true" />
              <div className="map-label">
                <span className="stat-label">APOLLO</span>
                <span className="stat-value">Rigaer Str. 42, Berlin</span>
              </div>
            </div>
            <div className="location-info glass-card reveal">
              <div>
                <span className="stat-label">Hours</span>
                <span className="stat-value">Thu - Sun · 22:00 - 07:00</span>
              </div>
              <div>
                <span className="stat-label">Transit</span>
                <span className="stat-value">U5 Frankfurter Tor · 6 min walk</span>
              </div>
              <div>
                <span className="stat-label">Sound</span>
                <span className="stat-value">Custom Funktion-One rig</span>
              </div>
              <button className="btn ghost magnetic" data-magnet="14">
                <span className="btn-label">Get Directions</span>
              </button>
            </div>
          </div>
        </section>

        <footer className="section footer">
          <div className="footer-inner">
            <div>
              <div className="logo">APOLLO</div>
              <p>Exclusive techno bar · Berlin</p>
            </div>
            <div className="footer-links">
              <a href="#events">Events</a>
              <a href="#vip">VIP</a>
              <a href="#location">Location</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
