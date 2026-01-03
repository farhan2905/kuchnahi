'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ContactModal from './ContactModal';

const CLIENT_LOGOS = [
  "Logoipsum", "Adventures", "Circle", "Square", "Hexagon", "Triangle"
];

const SERVICES = [
  { name: "Branding", desc: "Identity systems that scale" },
  { name: "Web Design", desc: "Immersive digital experiences" },
  { name: "Development", desc: "Robust full-stack solutions" },
  { name: "Content", desc: "Storytelling that connects" }
];

const PLACEHOLDERS = {
  hero3: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
};

export default function Services() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
    <section className="py-32 text-black overflow-hidden relative">
      {/* Divider */}
      <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mb-12 ml-6 md:ml-12" />
      <span className="ml-6 md:ml-12 uppercase tracking-widest text-sm font-bold text-gray-500">Clients</span>

      {/* Main Pitch */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 my-24 text-center">
        <h2 className="text-3xl md:text-5xl leading-tight font-medium">
          Chosen by teams who appreciate refined design, clear messaging, and performance-driven marketing — supporting brands from startup stage to global scale.
        </h2>
      </div>

      {/* Clients Marquee (Grayscale) */}
      <div className="mb-32">
        <div className="relative flex overflow-x-hidden">
          <motion.div 
            className="flex gap-12 md:gap-24 whitespace-nowrap px-12 items-center"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, i) => (
              <div key={i} className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-xl shadow-sm flex items-center justify-center grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                <span className="text-xl font-bold font-mono">{client}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Services List */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
         <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-yellow-500" />
            <span className="uppercase tracking-widest text-sm font-bold text-gray-500">Services</span>
         </div>
        
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            At <span className="text-gray-400">kuchnahi.</span> we blend creativity with strategy — <span className="text-gray-400">clean storytelling, intelligent marketing, and data-backed decisions that push brands ahead.</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visual Card */}
             <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer">
                 <img src={PLACEHOLDERS.hero3} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                 <div className="absolute bottom-6 left-6 text-white">
                     <h3 className="text-2xl font-bold">Branding</h3>
                     <p className="text-white/80">Brands that resonate</p>
                 </div>
             </div>
             
             {/* Text Cards */}
             <div className="flex flex-col gap-8">
                {SERVICES.slice(1).map((service, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                        <p className="text-gray-500">{service.desc}</p>
                    </div>
                ))}
                
                <div className="bg-black text-white p-8 rounded-2xl flex flex-col justify-between cursor-pointer group">
                    <div>
                        <span className="text-xs uppercase bg-white/20 px-2 py-1 rounded">Talk to us</span>
                        <p className="mt-4 text-lg text-gray-300">Partner with a marketing team that transforms ideas into measurable results.</p>
                    </div>
                    <button
                      onClick={() => setIsContactModalOpen(true)}
                      className="mt-8 bg-white text-black px-6 py-3 rounded-full font-bold self-start group-hover:scale-105 transition-transform cursor-pointer"
                    >
                        Start now
                    </button>
                </div>
             </div>
        </div>
      </div>
    </section>

    <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>
  );
}
