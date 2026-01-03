'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA CONFIGURATION ---
// These match the exact text cycles seen in the video
const HERO_TEXTS = [
  "Marketing that converts",
  "Experienced Team",
  "Ready to serve"
];

// Floating Object Data (Refined positions and physics)
const FLOATING_ITEMS = [
  { 
    id: 1, 
    src: "/images/bag.png", 
    position: "top-[15%] left-[10%]", 
    rotate: -15,
    duration: 6,
    scale: 1.1
  },
  { 
    id: 2, 
    src: "/images/jacket.png", 
    position: "top-[18%] right-[12%]", 
    rotate: 15,
    duration: 7,
    scale: 0.9
  },
  { 
    id: 3, 
    src: "/images/shoe.png", 
    position: "bottom-[20%] left-[15%]", 
    rotate: -25,
    duration: 5,
    scale: 1.0
  },
  { 
    id: 4, 
    src: "/images/gradient-blur.png", 
    position: "bottom-[15%] right-[10%]", 
    rotate: 0,
    duration: 8,
    scale: 1.0,
    blur: true 
  }
];

export default function TypewriterHero() {
  const [index, setIndex] = useState(0);

  // 1. CYCLIC LOGIC: Rotate text every 2.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_TEXTS.length);
    }, 2500); // 2500ms = 2.5 seconds per slide

    return () => clearInterval(timer);
  }, []);

  // 2. ANIMATION VARIANTS (The "Slot Machine" Reveal Effect)
  const textVariants = {
    enter: { 
      y: 50,    // Start below
      opacity: 0,
      rotateX: 20 // Slight 3D rotation for style
    },
    center: { 
      y: 0,     // End in center
      opacity: 1,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } // Quint easing
    },
    exit: { 
      y: -50,   // Exit above
      opacity: 0,
      rotateX: -20,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } // Quint easing
    }
  };

  // 3. FLOATING ANIMATION (Sine Wave Physics)
  const floatVariants = (duration: number) => ({
    animate: {
      y: [0, -25, 0], // Move up 25px then down
      transition: {
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  });

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center bg-[#F5F5F7]">
      
      {/* --- LAYER 1: FLOATING OBJECTS --- */}
      {FLOATING_ITEMS.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute ${item.position} pointer-events-none`}
          variants={floatVariants(item.duration)}
          animate="animate"
          initial={{ rotate: item.rotate }}
          style={{ 
            filter: item.blur ? 'blur(4px)' : 'none',
            transform: `rotate(${item.rotate}deg) scale(${item.scale})`
          }}
        >
          <img 
            src={item.src} 
            alt={`Floating item ${item.id}`}
            className="w-32 h-32 object-contain"
          />
        </motion.div>
      ))}

      {/* --- LAYER 2: CENTER CONTENT --- */}
      <div className="z-10 text-center px-4 flex flex-col items-center justify-center">
        
        {/* STATIC TEXT: "We create" */}
        <p className="text-gray-500 text-xl md:text-2xl font-medium mb-4">
          We create
        </p>

        {/* DYNAMIC TEXT CONTAINER - Slot Machine Effect */}
        <div className="h-32 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h2
              key={index} // Key change triggers the animation
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-black text-center leading-tight"
            >
              {HERO_TEXTS[index]}
            </motion.h2>
          </AnimatePresence>
        </div>
      </div>

    </section>
  );
}
