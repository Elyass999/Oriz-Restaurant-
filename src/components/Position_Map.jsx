import React from 'react';

export default function Position_Map() {
  // Define the reusable style object for the media elements
  const mediaElementStyle = {
    width: '100%',
    height: '400px', // Consistent height for both map and video
    display: 'block',
    border: 'none',
    borderRadius: '8px', // Slightly smaller radius for the inner elements
    objectFit: 'cover', // Ensures the video covers the area if aspect ratio is off
  };

  // Define the style object for the card/wrapper (to apply shadows/radius)
  const mediaCardStyle = {
    flex: '1 1 45%', 
    minWidth: '300px',
    position: 'relative',
    borderRadius: '12px', 
    overflow: 'hidden',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)', // Enhanced subtle shadow
    transition: 'transform 0.3s ease-in-out',
  };

  // Define the style object for the responsive container
  const contentWrapperStyle = {
    display: 'flex',
    flexWrap: 'wrap', 
    gap: '2rem',
    width: '100%',
    maxWidth: '1200px',
    justifyContent: 'center',
    marginTop: '20px',
    padding: '0 20px',
  };

  // Note: Hover effects are NOT possible with simple inline styles, 
  // but the aesthetic layout is applied.

  return (
    <section id="localisation-section" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '100%', 
        padding: '40px 0',
        backgroundColor: '#fcfcfc'
    }}>
      
      <h2 className='text-5xl md:text-6xl font-serif text-oriz-green mb-8 mt-6 text-center' style={{ marginBottom: '30px' }}>
        Nos Localisation
      </h2>
      
      <div style={contentWrapperStyle}>
        
        {/* Video Card */}
        <div style={mediaCardStyle}>
          <video
            src="src/Local.mp4"
            style={mediaElementStyle}
            controls
            // Using preload="none" helps prevent video from affecting page load performance
            preload="none" 
            poster=""
          />
        </div>

        {/* Map Card */}
        <div style={mediaCardStyle}>
          <iframe
            // In a real app, replace this placeholder with a functional Google Maps embed URL
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3287.036902566061!2d-5.543161124321742!3d33.865973673227664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda045005d9e0611%3A0xf46742abfbddd8e0!2sRestaurant%20Oriz!5e1!3m2!1sen!2sma!4v1764456944868!5m2!1sen!2sma" 
            title="Our Location Map"
            style={mediaElementStyle}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      
      {/* NOTE ON RESPONSIVENESS: 
        Pure inline styles cannot handle media queries. 
        The responsive stack (two columns becoming one) is handled by:
        1. flexWrap: 'wrap' on the parent.
        2. flex: '1 1 45%' on the children. 
        This is CSS Flexbox, which ensures the items stack when there isn't enough horizontal space, 
        though you cannot manually adjust the height for small screens without CSS modules or a library.
      */}
    </section>
  );
}