'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Array of 8 placeholder images for the circular ring
const ringImages = [
  { src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", alt: "Product 1" },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", alt: "Product 2" },
  { src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", alt: "Product 3" },
  { src: "https://images.unsplash.com/photo-1504198458649-3128b932f49e?w=1600&q=80", alt: "Product 4" },
  { src: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80", alt: "Product 5" },
  { src: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&q=80", alt: "Product 6" },
  { src: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=80", alt: "Product 7" },
  { src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80", alt: "Product 8" },
];

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const texts = ["Marketing that converts", "Experienced Team", "Ready to serve"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Circular Ring Container - Ferris Wheel Effect */}
      <motion.div
        className="absolute w-[80vmin] h-[80vmin]"
        animate={{ rotate: 360 }}
        transition={{
          duration: 40,
          ease: "linear",
          repeat: Infinity
        }}
      >
        {ringImages.map((img, index) => {
          const angle = index * 45; // 0, 45, 90, 135, 180, 225, 270, 315
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `rotate(${angle}deg) translateX(38vmin)`
              }}
            >
              <motion.div
                initial={{ rotate: -angle }}
                animate={{ rotate: -360 - angle }}
                transition={{
                  duration: 40,
                  ease: "linear",
                  repeat: Infinity
                }}
                className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-white"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Central Text */}
      <div className="z-10 text-center relative">
        <p className="text-gray-500 text-lg md:text-xl font-medium mb-4 uppercase tracking-widest">We create</p>
        <div className="h-24 md:h-32 overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h2
              key={textIndex}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-black"
            >
              {texts[textIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>
        
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button className="bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform cursor-hover shadow-lg">
            Learn more
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-gray-400 text-sm animate-bounce">
        Scroll to explore
      </div>
    </section>
  );
}
