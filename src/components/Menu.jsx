import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MENU_ITEMS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [ 'Tacos', 'Panini', 'Burgers','Salads','Pizza','Plats'];

const Menu = () => {
  // NOTE: Initial category is 'Starters' but is not in CATEGORIES array. 
  // We'll set it to the first category if 'Starters' is not intended.
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [filteredItems, setFilteredItems] = useState([]);
  const containerRef = useRef(null);
  const cardsRef = useRef(null);
  const categoriesRef = useRef(null); // Ref for category buttons

  // 1. Filter items based on activeCategory
  useEffect(() => {
    // Ensuring the initial filter happens correctly
    const initialCategory = activeCategory === 'Starters' ? CATEGORIES[0] : activeCategory;
    setFilteredItems(MENU_ITEMS.filter(item => item.category === initialCategory));
  }, [activeCategory]);

  // 2. Animation for Menu Cards (runs whenever category changes)
  useEffect(() => {
    // This is already set up correctly to re-animate cards on category change
    if (cardsRef.current) {
        const timer = setTimeout(() => {
              const cards = cardsRef.current?.children;
              if(cards && cards.length > 0) {
                  gsap.fromTo(cards, 
                      { y: 30, opacity: 0, scale: 0.95 },
                      { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: "power2.out", clearProps: "all" }
                    );
              }
        }, 10);
        return () => clearTimeout(timer);
    }
  }, [filteredItems]);

  // 3. Animation on Component Mount (Page Open)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // A. Header Animation (Runs on component mount, NOT on scroll)
      gsap.from(".menu-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.1 // Slight delay for a smoother start
      });


    });

    return () => ctx.revert();
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <section id="menu" ref={containerRef} className="py-24 bg-oriz-cream text-oriz-dark">
      <div className="container mx-auto px-6">
        {/* Menu Header */}
        <div className="text-center mb-16 menu-header">
          <h3 className="text-oriz-green uppercase tracking-widest text-sm font-bold mb-2">Découvrez nos plats populaires</h3>
          <h2 className="text-4xl md:text-5xl font-serif text-oriz-green mb-6">Menu populaire</h2>
          <div className="w-24 h-1 bg-oriz-gold mx-auto"></div>
        </div>

        {/* Category Buttons */}
        <div ref={categoriesRef} className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full border transition-all duration-300 font-serif ${
                activeCategory === cat
                  ? 'bg-oriz-green text-oriz-yellow border-oriz-green'
                  : 'bg-transparent text-oriz-green border-oriz-green hover:bg-oriz-green/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {filteredItems.map((item) => (
            <div key={item.id} className="group relative bg-white p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3 h-48 md:h-auto overflow-hidden rounded-md">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="text-xl font-serif font-bold text-oriz-green">{item.name}</h4>
                  <span className="text-oriz-gold font-bold text-lg">{item.price}</span>
                </div>
                <div className="w-full h-px bg-gray-200 mb-3"></div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                <button className="mt-4 text-xs uppercase tracking-widest text-oriz-lightGreen font-bold hover:text-oriz-yellow transition-colors self-start">
                  <a href="https://wa.me/0666485816">
                    <img src="https://img.icons8.com/?size=24&id=16733&format=png&color=40C057" alt="WhatsApp" className="inline-block w-6 h-6 mr-2" />
                    Commandez maintenant
                  </a>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;