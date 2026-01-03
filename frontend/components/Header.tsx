'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import MenuOverlay from './MenuOverlay';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center mix-blend-difference text-white">
        {/* mix-blend-difference ensures visibility on light backgrounds (turns text black) */}
        <h1 className="text-2xl font-bold tracking-tighter cursor-pointer">Kuchnahi.</h1>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex flex-col items-end gap-1.5 cursor-pointer p-2 cursor-hover"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-0.5 bg-white transition-all group-hover:w-10"
          />
          <motion.div
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-0.5 bg-white transition-all group-hover:w-10"
          />
          <motion.div
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-0.5 bg-white transition-all group-hover:w-10"
          />
        </button>
      </header>

      <MenuOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
