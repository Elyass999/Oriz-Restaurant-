import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GALLERY_IMAGES } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(imagesRef.current.filter(Boolean), {
        onEnter: (elements) => {
          gsap.fromTo(elements, 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out" }
          );
        },
        once: true
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={containerRef} className="py-24 bg-oriz-dark text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h3 className="text-oriz-gold uppercase tracking-widest text-sm font-bold mb-2">Ambience</h3>
            <h2 className="text-4xl md:text-5xl font-serif">Galerie intérieure</h2>
          </div>
          <p className="text-gray-400 max-w-md mt-4 md:mt-0 text-sm md:text-base">
            Conçu pour vous plonger dans la tranquillité. Chaque recoin d'Oriz raconte une histoire de nature et d'élégance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[300px]">
  {GALLERY_IMAGES.map((img, index) => (
    <div
      key={img.id}
      ref={(el) => { imagesRef.current[index] = el }}
      className={`relative overflow-hidden group rounded-sm ${img.span ? 'md:col-span-2' : ''}`}
    >

      {/* --- VIDEO AS REEL (vertical format) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div  className="w-full h-full max-h-none aspect-[9/16] overflow-hidden rounded-lg shadow-lg">
          <video
            src={img.src}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* --- IMAGE IN NATURAL FORMAT --- */}
      <img
        src={img.src}
        alt={img.alt}
        className="relative z-10 w-full h-full object-cover opacity-80 
                   group-hover:opacity-100 transform group-hover:scale-110 
                   transition-all duration-700 ease-in-out"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                      flex items-end p-6 z-20">
        <span className="text-white font-serif text-lg tracking-wide transform 
                         translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          {img.alt}
        </span>
      </div>

    </div>
  ))}
</div>

      </div>
    </section>
  );
};

export default Gallery;