import React, { useState, useRef, useEffect } from 'react';
import emailjs from 'emailjs-com';

import { motion, AnimatePresence } from 'framer-motion';
import '../components/css/Portfolio.css'; // Ensure CSS path is correct
import ThrivePersonology from '../assets/ThrivePersonology.webp';
import BoogieBoys from '../assets/BoogieBoys.webp';
import BakersBurns from '../assets/BakersBurns1.webp';



function PortfolioOverlay() {
  const [flipWeb, setFlipWeb] = useState(false);
  const [flipMusic, setFlipMusic] = useState(false);
  const [flipDesign, setFlipDesign] = useState(false);
  const [showLatestWebsites, setShowLatestWebsites] = useState(false);
  
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const toggleLatestWebsites = (e) => {
    e.stopPropagation();
    setShowLatestWebsites(!showLatestWebsites);
  };

  useEffect(() => {
    const checkScrollPosition = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
      }
    };
    
    checkScrollPosition();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", checkScrollPosition);
    }
    
    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, [showLatestWebsites]);
  const form = useRef();

  const toggleFlip = (section) => {
    if (section === 'web') setFlipWeb(!flipWeb);
    if (section === 'music') setFlipMusic(!flipMusic);
    if (section === 'design') setFlipDesign(!flipDesign);
  };


  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_uk1tgor', 'template_1ocsafv', form.current, 'FF0xIjAlMKuW5-8Dd')
      .then((result) => {
          console.log(result.text);
          alert("Message sent successfully!");
      }, (error) => {
          console.log(error.text);
          alert("An error occurred, please try again.");
      });

    e.target.reset();
  };
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Adjust scroll speed as needed
      scrollContainerRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="portfolio-container">
      <section id="web-design" className={`portfolio-section ${flipWeb ? 'flip' : ''}`} onClick={() => toggleFlip('web')}>
        <div className="front">
          <h2>Web Design</h2>
          
          <button className="latest-websites-button" onClick={toggleLatestWebsites}>Check out my latest websites</button>
        </div>
        <div className="back">
          <h2>Tools & Technologies</h2>
          <p>HTML, CSS, JavaScript, React, Node.js</p>
          
        </div>
      </section>

      <AnimatePresence>
        {showLatestWebsites && (
          <motion.div 
            className="latest-websites-container"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Left Scroll Button */}
            {canScrollLeft && (
              <button className="scroll-button left" onClick={() => scroll("left")}>◀</button>
            )}

            {/* Scrollable Content */}
            <div className="latest-websites" ref={scrollContainerRef}>

              <a href="https://boogieboys.one" target="_blank" rel="noopener noreferrer">
                <img className="tile" src={BoogieBoys} alt="BoogieBoys" />
              </a>
              <a href="https://bakersburns.com" target="_blank" rel="noopener noreferrer">
                <img className="tile" src={BakersBurns} alt="BoogieBoys" />
              </a>
              <a href="https://thrive.tezzeraktmedia.space"  target="_blank" rel="noopener noreferrer">
                <img className="tile" src={ThrivePersonology} alt="Thrive Personology" />
              </a>
            </div>

            {/* Right Scroll Button */}
            {canScrollRight && (
              <button className="scroll-button right" onClick={() => scroll("right")}>▶</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <section id="music" className={`portfolio-section ${flipMusic ? 'flip' : ''}`} onClick={() => toggleFlip('music')}>
        <div className="front">
          <h2>Music Production</h2>
          <p>Listen to my compositions and audio engineering projects spanning various genres.</p>
        </div>
        <div className="back">
          <h2>Tools & Technologies</h2>
          <p>Logic Pro, Ozone9 </p>
        </div>
      </section>

      <section id="3d-design" className={`portfolio-section ${flipDesign ? 'flip' : ''}`} onClick={() => toggleFlip('design')}>
        <div className="front">
          <h2>3D/Visual Design</h2>
          <p>Explore my 3D visualization projects </p>
        </div>
        <div className="back">
          <h2>Tools & Technologies</h2>
          <p>Blender, Fusion 360, Davinci Resolve </p>
        </div>
      </section>

      <div className="contact-form-container">
        <h2>Contact Me</h2>
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name="from_name" placeholder="Your Name" required />
          <input type="email" name="from_email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default PortfolioOverlay;
