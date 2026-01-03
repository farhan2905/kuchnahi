'use client';

import { motion } from 'framer-motion';

// Using specific Unsplash IDs
const PLACEHOLDERS = {
  project1: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80",
  project2: "https://images.unsplash.com/photo-1504198458649-3128b932f49e?w=1600&q=80", 
  project3: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80",
};

export default function Work() {
  const projects = [
    { id: 1, title: "Chromor", cat: "Branding", img: PLACEHOLDERS.project1, desc: "Color and tech into dynamic visual experiences" },
    { id: 2, title: "Movi", cat: "Product", img: PLACEHOLDERS.project2, desc: "Cutting-edge running gear designed to enhance every stride" },
    { id: 3, title: "Grano", cat: "Web Design", img: PLACEHOLDERS.project3, desc: "Sustainable brand focused on outdoor living" },
  ];

  return (
    <section className="py-32 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-32"
        >
          <div className="relative inline-block">
            <h2 className="text-7xl md:text-9xl font-bold text-black tracking-tighter">
              Work
            </h2>
            <span className="absolute -top-4 -right-8 text-xl font-bold bg-black text-white w-8 h-8 rounded-full flex items-center justify-center">3</span>
          </div>
        </motion.div>

        <div className="space-y-48">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1 }}
              className={`group flex flex-col ${idx % 2 !== 0 ? 'md:items-end' : 'md:items-start'}`}
            >
              {/* Project Card */}
              <div className="w-full md:w-[80%] cursor-pointer cursor-hover">
                <div className="relative overflow-hidden rounded-3xl aspect-[16/9] mb-8 shadow-xl">
                  <motion.img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-8 right-8 md:right-auto md:left-[calc(100%+2rem)] w-32 md:w-48 aspect-video rounded-xl overflow-hidden shadow-2xl hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10">
                     <img src={project.img} className="w-full h-full object-cover filter blur-sm scale-150" />
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-4xl md:text-5xl font-bold text-black mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-lg">
                    {project.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
