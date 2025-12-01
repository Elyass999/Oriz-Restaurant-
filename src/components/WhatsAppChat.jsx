import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FaWhatsapp } from 'react-icons/fa'; 

// --- Configuration ---
const WHATSAPP_NUMBER = '0666485816'; 
const DEFAULT_MESSAGE = "Bonjour ! Je vous contacte au sujet de votre menu populaire."; 
// ---------------------

const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState(''); // <--- NEW STATE FOR USER INPUT
  const chatRef = useRef(null);
  const iconRef = useRef(null);

  // Function to handle the redirection
  const redirectToWhatsApp = (message) => {
    const finalMessage = message && message.trim() !== '' ? message : DEFAULT_MESSAGE;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMessage)}`, '_blank');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (chatRef.current) {
        if (isOpen) {
          // Animate chat box open
          gsap.to(chatRef.current, {
            width: '320px', 
            height: '400px', 
            duration: 0.5,
            ease: "power3.out",
            borderRadius: '15px',
            onStart: () => {
                if (iconRef.current) {
                    gsap.to(iconRef.current, { scale: 0, opacity: 0, duration: 0.2, ease: "back.in", pointerEvents: 'none' });
                }
            }
          });
        } else {
          // Animate chat box closed
          gsap.to(chatRef.current, {
            width: '60px', 
            height: '60px', 
            duration: 0.3,
            ease: "power2.in",
            borderRadius: '50%',
            onComplete: () => {
                if (iconRef.current) {
                    gsap.to(iconRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)", pointerEvents: 'auto' });
                }
            }
          });
        }
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  const handleIconClick = () => {
    setIsOpen(true);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  // --- NEW: Function to handle the final button click ---
  const handleSendRedirect = () => {
    // 1. Redirect with the text currently in the input state
    redirectToWhatsApp(inputText); 
    
    // 2. Clear the input and close the chat simulation after redirect
    setInputText('');
    setIsOpen(false);
  };
  // ----------------------------------------------------


  return (
    <div 
      ref={chatRef}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        backgroundColor: isOpen ? '#e5ddd5' : '#25D366', 
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexDirection: 'column',
        width: '60px', 
        height: '60px',
        borderRadius: '50%',
      }}
      // Clicking the closed icon redirects immediately with the default message
    >
      {/* WhatsApp Icon */}
      <div 
        ref={iconRef}
        onClick={isOpen ? handleCloseChat : handleIconClick} 
        style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#25D366', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '30px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
            zIndex: 1001,
            opacity: 1,
            transform: 'scale(1)',
        }}
      >
        <FaWhatsapp />
      </div>

      {/* Chat Content (Only visible inside the expanded container) */}
      {isOpen && (
        <div style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '15px',
            boxSizing: 'border-box',
            backgroundColor: '#e5ddd5',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
            <h4 style={{ margin: 0, fontSize: '1.1em', color: '#128C7E' ,textAlign:'center'}}>Start a Chat</h4>
            <button onClick={handleCloseChat} style={{ background: 'none', border: 'none', fontSize: '1.5em', cursor: 'pointer', color: '#666' }}>
                ×
            </button>
          </div>

          {/* Body */}
          <div style={{ flexGrow: 1, padding: '10px 0', overflowY: 'auto', fontSize: '0.9em', color: '#333' }}>
            <p style={{backgroundColor: '#DCF8C6', padding: '8px', borderRadius: '10px', maxWidth: '80%', marginBottom: '5px', alignSelf: 'flex-start'}}>Saisissez votre message ci-dessous et cliquez sur Envoyer pour ouvrir WhatsApp !</p>
            {/* Displaying user input as a message preview is an option, but keeping it simple for now */}
          </div>

          {/* Input/Send Button */}
          <div style={{ display: 'flex', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={inputText} // <--- BINDING VALUE
              onChange={(e) => setInputText(e.target.value)} // <--- UPDATING STATE
              onKeyPress={(e) => { // Optional: send on Enter key
                if (e.key === 'Enter') {
                  handleSendRedirect();
                }
              }}
              style={{ flexGrow: 1, border: '1px solid #ddd', borderRadius: '20px', padding: '8px 12px', marginRight: '10px' }} 
            />
            {/* Direct Send Button */}
            <button 
                onClick={handleSendRedirect} // <-- TRIGGERS REDIRECT WITH INPUT TEXT
                style={{ 
                    backgroundColor: '#25D366', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '50%', 
                    width: '35px', 
                    height: '35px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '1.2em',
                    cursor: 'pointer'
                }}>
                &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppChat;