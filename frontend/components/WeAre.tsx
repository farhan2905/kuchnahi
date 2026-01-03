'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function WeAre() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Image expansion: 15vw×20vh → 85vw×50vh (horizontal display, more width than height)
  const width = useTransform(scrollYProgress, [0.2, 0.6], ["15vw", "85vw"]);
  const height = useTransform(scrollYProgress, [0.2, 0.6], ["20vh", "50vh"]);
  const radius = useTransform(scrollYProgress, [0.2, 0.6], ["100px", "20px"]);
  
  // Text connection animation: both move inward toward the image (reduced movement to prevent overlap)
  const weAreX = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "10%"]);
  const weAreOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0.8]);
  const kuchnahiX = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "-10%"]);
  const kuchnahiOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0.8]);
  
  // Inner text reveal after image expansion
  const textRevealOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const textRevealY = useTransform(scrollYProgress, [0.5, 0.7], [30, 0]);
  
  // Exit animation
  const exitOpacity = useTransform(scrollYProgress, [0.8, 1.0], [1, 0]);

  return (
    <section ref={containerRef} className="h-[400vh] relative">
      <motion.div
        style={{ opacity: exitOpacity }}
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      >
        
        <div className="flex items-center justify-center w-full relative gap-8 md:gap-12">
          <motion.h2
            style={{ x: weAreX, opacity: weAreOpacity }}
            className="text-4xl md:text-6xl lg:text-8xl font-bold text-black whitespace-nowrap z-10 mr-4 md:mr-8 tracking-tighter"
          >
            We are
          </motion.h2>

          <motion.div
            style={{ width, height, borderRadius: radius }}
            className="relative overflow-hidden z-20 shadow-2xl bg-black border-4 border-white"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&q=80"
              className="w-full h-full object-cover opacity-90"
              style={{ scale: useTransform(scrollYProgress, [0.2, 0.6], [1.6, 1]) }}
            />
            
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <motion.h3
                style={{ opacity: textRevealOpacity, y: textRevealY }}
                className="text-white text-4xl md:text-7xl font-bold text-center px-4 tracking-tighter max-w-4xl"
              >
                Not just a simple agency.
              </motion.h3>
            </div>
          </motion.div>

          <motion.h2
            style={{ x: kuchnahiX, opacity: kuchnahiOpacity }}
            className="text-4xl md:text-6xl lg:text-8xl font-bold text-black whitespace-nowrap z-10 ml-4 md:ml-8 tracking-tighter"
          >
            Kuchnahi.
          </motion.h2>
        </div>
      </motion.div>
    </section>
  );
}
