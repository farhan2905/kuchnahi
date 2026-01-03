'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WeAre from '@/components/WeAre';
import Work from '@/components/Work';
import Services from '@/components/Services';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="font-sans antialiased text-black selection:bg-black selection:text-white bg-[#F9F9F7]">
      <Header />
      
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <WeAre />
        </section>
        <section id="work">
          <Work />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="contact">
          <Footer />
        </section>
      </main>
    </main>
  );
}
