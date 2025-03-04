import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import { motion, AnimatePresence } from 'framer-motion';
import '../components/css/Portfolio.css'; // Ensure CSS path is correct
import ThrivePersonology from '../assets/ThrivePersonology.webp';

function PortfolioOverlay() {
  const [flipWeb, setFlipWeb] = useState(false);
  const [flipMusic, setFlipMusic] = useState(false);
  const [flipDesign, setFlipDesign] = useState(false);
  const [showLatestWebsites, setShowLatestWebsites] = useState(false);
  const form = useRef();

  const toggleFlip = (section) => {
    if (section === 'web') setFlipWeb(!flipWeb);
    if (section === 'music') setFlipMusic(!flipMusic);
    if (section === 'design') setFlipDesign(!flipDesign);
  };

  const toggleLatestWebsites = (e) => {
    e.stopPropagation();
    setShowLatestWebsites(!showLatestWebsites);
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
            className="latest-websites"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <a href="https://portfolio.thrivepersonology.trentynnicholas.com" className="tile" target="_blank" rel="noopener noreferrer">
              <img src={ThrivePersonology} alt="Thrive Personology" style={{ width: '300px', height: 'auto' }} />
            </a>
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
