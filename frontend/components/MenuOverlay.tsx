'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactModal from './ContactModal';

const menuItems = [
  { name: 'Home', href: '#home' },
  { name: 'Work', href: '#work' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function MenuOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const handleMenuClick = (href: string) => {
    onClose();
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const overlayVariants = {
    closed: {
      x: '100%',
      opacity: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const itemVariants = {
    closed: {
      x: 50,
      opacity: 0,
      transition: { duration: 0.3 }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Menu Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-50 bg-black flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-6 md:px-12 md:py-8">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-white">
                Kuchnahi.
              </h1>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="group flex flex-col items-end gap-1.5 cursor-pointer p-2"
                aria-label="Close menu"
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 45 }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-0.5 bg-white"
                />
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -45 }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-0.5 bg-white"
                />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 flex flex-col justify-center items-center px-6 md:px-12">
              <nav className="flex flex-col items-center space-y-6 md:space-y-8">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: 0.1 + index * 0.1 }}
                    onClick={() => handleMenuClick(item.href)}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter hover:scale-105 transition-transform cursor-pointer cursor-hover"
                  >
                    {item.name}
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Footer Section */}
            <div className="px-6 py-8 md:px-12 md:py-12 text-center">
              <p className="text-xl md:text-2xl text-gray-300 mb-4">
                Let's work together
              </p>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="text-lg md:text-xl text-white hover:text-gray-300 transition-colors cursor-pointer"
              >
                Get in touch
              </button>
            </div>
          </motion.div>

          <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        </>
      )}
    </AnimatePresence>
  );
}
