import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      tl.fromTo(textRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(subTextRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      )
      .to([textRef.current, subTextRef.current], {
        opacity: 0,
        y: -30,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.in"
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-oriz-green text-oriz-gold">
      <div className="text-center overflow-hidden">
        <img src='src/logo.png' ref={textRef} />
        <p ref={subTextRef} className="mt-4 text-sm md:text-lg tracking-[0.2em] text-oriz-cream uppercase">
          cuisine d'exception,moment mémorable
        </p>
      </div>
    </div>
  );
};

export default Loader;