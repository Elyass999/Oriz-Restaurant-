import React, { useEffect, useRef } from 'react';

import gsap from 'gsap';
import { ChefHat, Leaf, Award } from 'lucide-react';





const About = () => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current,
        { x: -50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 1, 
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );

      gsap.fromTo(textRef.current?.children || [],
        { x: 50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          stagger: 0.2, 
          duration: 1, 
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-24 bg-oriz-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-oriz-yellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div ref={imgRef} className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="src/Oriz-About_Pict.webp" 
                alt="Chef plating food" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute top-6 -left-6 w-full h-full border-2 border-oriz-gold z-0 hidden md:block"></div>
          </div>

          <div ref={textRef} className="w-full lg:w-1/2">
            <h3 className="text-oriz-green uppercase tracking-widest text-sm font-bold mb-2">A propos de nous </h3>
            <h2 className="text-4xl md:text-5xl font-serif text-oriz-green mb-6">Enraciné dans la tradition,<br/>Éclosion dans la modernité</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Notre restaurant s’engage à offrir une cuisine savoureuse préparée avec des ingrédients frais et de qualité. Nous mettons un point d’honneur à créer une ambiance chaleureuse où chaque client se sent chez lui. Notre équipe passionnée travaille chaque jour pour proposer des plats authentiques, un service attentionné et une expérience culinaire qui marque les esprits.
            </p>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4 bg-white shadow-md rounded-lg">
                <ChefHat className="text-oriz-gold w-8 h-8 mb-2" />
                <h4 className="font-serif font-bold text-oriz-green">Maîtres cuisiniers</h4>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white shadow-md rounded-lg">
                <Leaf className="text-oriz-green w-8 h-8 mb-2" />
                <h4 className="font-serif font-bold text-oriz-green">Frais et bio</h4>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white shadow-md rounded-lg">
                <Award className="text-oriz-yellow w-8 h-8 mb-2" />
                <h4 className="font-serif font-bold text-oriz-green">Lauréat de prix</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;