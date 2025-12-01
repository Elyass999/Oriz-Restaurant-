import React, { useState, useEffect, useRef } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';
import gsap from 'gsap';
// NOTE: Ensure your constants file has NAV_LINKS defined
// import { NAV_LINKS } from '../constants'; 

// Placeholder for NAV_LINKS for demonstration
const NAV_LINKS = [
    { name: 'Acceuil', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallerie', href: '#gallery' },
    { name: 'A propos', href: '#about' },
    { name: 'Location', href: '#localisation-section' },
];


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const linksRef = useRef([]);

  // --- Scroll Detection Effect ---
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- GSAP Mobile Menu Animation Effect ---
  useEffect(() => {
    if (isOpen) {
      // 1. Animate Menu Open
      gsap.to(mobileMenuRef.current, {
        x: '0%', // Slide fully into view
        duration: 0.6,
        ease: 'power3.out',
      });
      // 2. Animate Links Staggered
      gsap.fromTo(linksRef.current, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.5, 
          delay: 0.3,
          clearProps: "all" // Important: removes inline styles after animation
        }
      );
    } else {
      // 1. Animate Menu Close
      gsap.to(mobileMenuRef.current, {
        x: '100%', // Slide fully out of view
        duration: 0.6,
        ease: 'power3.in',
      });
    }
  }, [isOpen]);

  // Use a ref for the initial closed state setup (safer than relying purely on CSS/Tailwind)
  useEffect(() => {
    // Set the initial hidden state for the mobile menu on mount
    gsap.set(mobileMenuRef.current, { x: '100%' }); 
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled || isOpen ? 'bg-oriz-green/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center text-white">
          
          {/* Enhanced Logo/Brand Section */}
          <div className={`transition-transform duration-300 ${scrolled ? 'scale-90' : 'scale-100'}`}>
            <img src="src/LogoNav.png" alt="Oriz Restaurant Logo" className="h-10 w-auto" />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-light tracking-widest hover:text-oriz-yellow transition-colors relative group"
              >
                {link.name}
                {/* Underline effect */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-oriz-yellow transition-all group-hover:w-full"></span>
              </a>
            ))}

          </div>

          {/* Mobile Hamburger/Close Button */}
          <button onClick={toggleMenu} className="md:hidden z-50 text-oriz-gold">
            {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 w-full h-screen bg-oriz-green z-30 flex flex-col justify-center items-center md:hidden"
        // Removed translate-x-full here, letting GSAP manage the transformation
      >
        <div className="flex flex-col space-y-8 text-center">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.name}
              // Store link refs for GSAP staggering
              ref={el => { linksRef.current[index] = el }}
              href={link.href}
              onClick={() => setIsOpen(false)} // Close menu on link click
              className="text-3xl font-serif text-oriz-cream hover:text-oriz-yellow transition-colors"
            >
              {link.name}
            </a>
          ))}

        </div>
      </div>
    </>
  );
};

export default Navbar;