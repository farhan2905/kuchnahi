'use client';

import { motion } from 'framer-motion';
import { Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#F9F9F7] pt-12 pb-12 px-6 md:px-12 text-black border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="w-full flex flex-col md:flex-row justify-between items-end pt-8 gap-6">
          <motion.h2 
             initial={{ y: 20, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             className="text-6xl md:text-[10rem] font-bold tracking-tighter leading-none"
          >
              kuchnahi.<span className="text-2xl md:text-4xl align-top">TM</span>
          </motion.h2>

          <div className="flex flex-col items-end gap-4 mb-4">
              <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"><Twitter size={16} /></a>
                  <a href="#" className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"><Instagram size={16} /></a>
                  <a href="#" className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"><Linkedin size={16} /></a>
              </div>
              <span className="text-gray-500 text-sm">© 2025 Kuchnahi. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
