'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function WeAre() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Image expansion: Desktop (15vw×20vh → 85vw×50vh), Mobile (80vw×25vh → 95vw×60vh)
  const width = useTransform(
    scrollYProgress,
    isMobile ? [0.1, 0.5] : [0.2, 0.6],
    isMobile ? ["80vw", "95vw"] : ["15vw", "85vw"]
  );
  const height = useTransform(
    scrollYProgress,
    isMobile ? [0.1, 0.5] : [0.2, 0.6],
    isMobile ? ["25vh", "60vh"] : ["20vh", "50vh"]
  );
  const radius = useTransform(
    scrollYProgress,
    isMobile ? [0.1, 0.5] : [0.2, 0.6],
    ["100px", "20px"]
  );
  
  // Desktop: Text moves horizontally toward the image
  const weAreX = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "10%"]);
  const kuchnahiX = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "-10%"]);
  
  // Mobile: Text moves vertically (We are up, Kuchnahi down)
  const weAreY = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "-20%"]);
  const kuchnahiY = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "20%"]);
  
  // Opacity animations
  const weAreOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0.8]);
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
        
        <div className="flex flex-col md:flex-row items-center justify-center w-full relative gap-4 md:gap-12">
          <motion.h2
            style={{
              x: isMobile ? 0 : weAreX,
              y: isMobile ? weAreY : 0,
              opacity: weAreOpacity
            }}
            className="text-2xl sm:text-3xl md:text-6xl lg:text-8xl font-bold text-black whitespace-nowrap z-10 tracking-tighter"
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
                className="text-white text-2xl sm:text-4xl md:text-7xl font-bold text-center px-4 tracking-tighter max-w-4xl"
              >
                Not just a simple agency.
              </motion.h3>
            </div>
          </motion.div>

          <motion.h2
            style={{
              x: isMobile ? 0 : kuchnahiX,
              y: isMobile ? kuchnahiY : 0,
              opacity: kuchnahiOpacity
            }}
            className="text-2xl sm:text-3xl md:text-6xl lg:text-8xl font-bold text-black whitespace-nowrap z-10 tracking-tighter"
          >
            Kuchnahi.
          </motion.h2>
        </div>
      </motion.div>
    </section>
  );
}
