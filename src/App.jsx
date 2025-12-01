import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import About from './components/About';
import Footer from './components/Footer';
import Loader from './components/Loader';
import FullMenu from './components/Full-Menu.jsx';
import Position_Map from './components/Position_Map.jsx';
import WhatsAppChat from './components/WhatsAppChat.jsx'; 

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      document.body.classList.add('loading');
    } else {
      document.body.classList.remove('loading');
    }
  }, [loading]);

  return (
    <div className="min-h-screen bg-oriz-cream selection:bg-oriz-gold selection:text-oriz-green">
      {loading && <Loader onComplete={() => setLoading(false)} />}      
      {!loading && (
        <main className="w-full relative">
          <Navbar />
          <Hero />
          <Menu />
          <Gallery />
          <FullMenu/>
          <About />
          <Position_Map/>
          <Footer />
          <WhatsAppChat/> 
        </main>
      )}
    </div>
  );
};

export default App;