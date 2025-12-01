import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Facebook, Instagram, Twitter, MapPin, Phone, Clock } from 'lucide-react';
import { NAV_LINKS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

// Placeholder for NAV_LINKS for demonstration



const Footer = () => {
  const footerRef = useRef(null);

  // --- GSAP Scroll-In Animation ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggering the animation for sub-elements for a nicer entry
      const elements = [
        ...footerRef.current.querySelectorAll('.footer-col'),
        footerRef.current.querySelector('.footer-brand-logo')
      ];

      gsap.fromTo(elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15, // Staggered entry for columns
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom-=150", // Trigger earlier than before
            toggleActions: "play none none none"
          }
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  // Custom component for column titles with a design element
  const FooterTitle = ({ children }) => (
    <h4 className="font-serif text-xl font-bold mb-6 text-oriz-yellow relative pb-2">
      {children}
      <span className="absolute left-0 bottom-0 w-10 h-0.5 bg-oriz-gold"></span>
    </h4>
  );

  return (
    <footer id="contact" ref={footerRef} className="bg-oriz-green text-oriz-cream pt-20 pb-10 border-t border-oriz-lightGreen">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 lg:gap-16 mb-16">
          
          {/* --- Column 1: Brand and Social (Enhanced) --- */}
          <div className="footer-col md:col-span-1">
            <img 
                src="src/LogoNav.png" 
                alt="Oriz Restaurant Logo" 
                className="h-16 w-auto mb-6 footer-brand-logo" 
            />
            <p className="text-sm opacity-90 leading-relaxed mb-6 italic">
              "L'art de la table rencontre l'harmonie de la nature."
            </p>
            <div className="flex space-x-5">
              <a href="https://www.instagram.com/restaurant.oriz/?hl=fr"  target='_blank' aria-label="Instagram" className="text-oriz-cream hover:text-oriz-yellow transition-colors transform hover:scale-110">
                <Instagram size={22} />
              </a>
              <a href="https://www.facebook.com/share/17kj86Lu69/" target='_blank'  aria-label="Facebook" className="text-oriz-cream hover:text-oriz-yellow transition-colors transform hover:scale-110">
                <Facebook size={22} />
              </a>

            </div>
          </div>

          {/* --- Column 2: Navigation --- */}
          <div className="footer-col">
            <FooterTitle>Explorer</FooterTitle>
            <ul className="space-y-4">
              {NAV_LINKS.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="text-base font-light opacity-80 hover:opacity-100 hover:text-oriz-yellow transition-colors">
                    {link.name.charAt(0).toUpperCase() + link.name.slice(1).toLowerCase()} 
                  </a>
                </li>
              ))}
              {/* Added Call-to-action link */}
               <li>
                </li>
            </ul>
          </div>

          {/* --- Column 3: Contact Info (Enhanced Icons/Layout) --- */}
          <div className="footer-col">
            <FooterTitle>Contact</FooterTitle>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-oriz-gold mt-1 flex-shrink-0" />
                <span className="text-sm font-light opacity-90">
                    Ghorfa 2 magasin N°5 Bloc 2, <br/> 
                    Meknes, Maroc
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-oriz-gold flex-shrink-0" />
                <div className="text-sm font-light opacity-90">
                    <a href="tel:0666485816" className="hover:text-oriz-yellow block transition-colors">0666485816</a>
                    <a href="tel:0668662434" className="hover:text-oriz-yellow block transition-colors">0668662434</a>
                </div>
              </li>
            </ul>
          </div>

          {/* --- Column 4: Opening Hours (Enhanced Layout) --- */}
          <div className="footer-col">
            <FooterTitle>Horaires d'ouverture</FooterTitle>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-oriz-gold mt-1 flex-shrink-0" />
                <div className="text-sm font-light opacity-90 w-full">
                  <p className="flex justify-between w-full">
                    <span className="font-medium">Lundi - Dimanche:</span> 
                  </p>
                  <p className="flex justify-between w-full text-base font-semibold text-oriz-yellow mt-1">
                    <span>7:30 Pm</span> <span>-</span> <span>01:00 Am</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Bottom Copyright and Legal Links --- */}
        <div className="border-t border-oriz-lightGreen/50 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-70">
          <p className="order-2 md:order-1 mt-4 md:mt-0">&copy; {new Date().getFullYear()} Restaurant Oriz. Tous droits réservés.</p>
          <div className="flex gap-6 order-1 md:order-2">
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;