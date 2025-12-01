import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../Css/FullMenu.css';

gsap.registerPlugin(ScrollTrigger);

export default function FullMenu() {
  const containerRef = useRef(null);
  const slidesRef = useRef([]);

  const slideImages = [
    "src/Full-Menu/m1.jpg", "src/Full-Menu/m3.jpg", "src/Full-Menu/m4.jpg",
    "src/Full-Menu/m5.jpg", "src/Full-Menu/m6.jpg", "src/Full-Menu/m7.jpg",
    "src/Full-Menu/m8.jpg", "src/Full-Menu/m9.jpg", "src/Full-Menu/m10.jpg",
    "src/Full-Menu/m11.jpg", "src/Full-Menu/m12.jpg", "src/Full-Menu/m13.jpg",
    "src/Full-Menu/m14.jpg", "src/Full-Menu/m15.jpg", "src/Full-Menu/m16.jpg",
    "src/Full-Menu/m17.jpg", "src/Full-Menu/m18.jpg", "src/Full-Menu/m19.jpg",
    "src/Full-Menu/m20.jpg", "src/Full-Menu/m21.jpg", "src/Full-Menu/m22.jpg",
  ];

  useEffect(() => {
    // Ensure we only interact with valid elements
    const slides = slidesRef.current.filter(Boolean);
    const totalSlides = slides.length;

    const ctx = gsap.context(() => {
      // Set initial Z-index so the first image is on top
      gsap.set(slides, {
        zIndex: (i) => totalSlides - i,
      });

      // Create one master timeline that pins the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalSlides * 100}%`, // Scroll distance proportional to image count
          scrub: 1, // Smooth scrubbing
          pin: true,
          anticipatePin: 1,
        }
      });

      // Loop through all slides except the last one (the last one doesn't need to turn)
      slides.forEach((slide, i) => {
        if (i === totalSlides - 1) return;

        // Create a sub-timeline for each slide's page turn
        tl.to(slide, {
          rotationY: -180, // Flip completely to the left
          transformOrigin: "left center", // The "spine" of the book
          ease: "power1.inOut",
          duration: 1,
          stagger: {
             each: 1 // One after the other
          }
        }, i * 1); // Sequence them properly in the timeline
        
        // Optional: Add a shadow effect to the page underneath as this one lifts
        if (slides[i + 1]) {
           tl.fromTo(slides[i+1].querySelector('.page-shadow'), 
             { opacity: 0.8 },
             { opacity: 0, duration: 0.5, ease: "power1.in" },
             i * 1
           );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="full-menu" className="full-menu-section">
      <div className="title-wrapper">
        <h1 className='text-5xl md:text-6xl font-serif text-oriz-green text-center'>
          Nos Menu Complet
        </h1>
        <p className="scroll-instruction">(Scroll to turn pages)</p>
      </div>

      <div className="book-perspective">
        <div className="book-spine">
          {slideImages.map((image, index) => (
            <div
              key={index}
              ref={(el) => { slidesRef.current[index] = el }}
              className="book-page"
            >
              <div className="page-content">
                <img
                  src={image}
                  alt={`Menu item ${index + 1}`}
                  className="page-image"
                />
                {/* Shadow overlay for depth */}
                <div className="page-shadow"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


















