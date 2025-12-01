import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { y: 120, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 2.2, 
          delay: 0.8,
          ease: "power3.out" 
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const styles = {

    video: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      pointerEvents: "none",
    },
  };

  return (
    <section 
      id="home" 
      ref={containerRef} 
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >

      {/* ---------------- BACKGROUND VIDEO---------------- */}
      <div style={styles.wrapper}>
        {/* Place the file in: public/Video_Restau.mp4 */}
        <video
          src="src/Video Intro Oriz.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={styles.video}
          aria-hidden="true"
          role="presentation"
        />
      </div>
      {/* ------------------------------------------------------------- */}

      <div ref={textRef} className="relative z-10 text-center px-4 max-w-4xl mx-auto">

        <img src="src/logo.png" alt="LOGO" className="h-65 w-auto md:h-70 -mt-20" />
        <p className="text-gray-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
          Découvrez la passion culinaire dans chaque plat.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="bg-oriz-yellow text-oriz-green px-8 py-3 font-bold hover:bg-white transition-colors duration-300">
            <a href="#menu">Explore Menu</a>
            
          </button>

        </div>
      </div>


    </section>
  );
};

export default Hero;
