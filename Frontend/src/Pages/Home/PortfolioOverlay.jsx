import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Portfolio.css';
import ThrivePersonology from '../../assets/ThrivePersonology.webp';
import BoogieBoys from '../../assets/BoogieBoys.webp';
import BakersBurns from '../../assets/BakersBurns1.webp';
import ContactForm from '../Contact/ContactForm';
import { Github } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faApple, faYoutube, faSoundcloud } from '@fortawesome/free-brands-svg-icons';

function PortfolioOverlay() {
  const [flipWeb, setFlipWeb] = useState(false);
  const [flipMusic, setFlipMusic] = useState(false);
  const [flipDesign, setFlipDesign] = useState(false);
  const [showLatestWebsites, setShowLatestWebsites] = useState(false);
  
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  const toggleFlip = (section) => {
    if (section === 'web') setFlipWeb(!flipWeb);
    if (section === 'music') setFlipMusic(!flipMusic);
    if (section === 'design') setFlipDesign(!flipDesign);
  };

  return (
    <div className="portfolio-container" >
      <div className="portfolio-section-container" style={{paddingBottom: '100px'}}>
        <section className='portfolio-section'>
        <div className="front">
            <h2>Web Design </h2>
            <div className="button-container">
              <a href="https://github.com/TEZZERAKTmedia" target="_blank" rel="noopener noreferrer" className="github-button">
                <Github size={18} className="github-icon" />
              </a>
              <button className="latest-websites-button" onClick={() => setShowLatestWebsites(!showLatestWebsites)}>
                Check out my latest websites
              </button>
            </div>
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
              {canScrollLeft && <button className="scroll-button left" onClick={() => scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })}>◀</button>}
              <div className="latest-websites" ref={scrollContainerRef}>
                <a href="https://boogieboys.one" target="_blank"><img className="tile" src={BoogieBoys} alt="BoogieBoys" /></a>
                <a href="https://bakersburns.com" target="_blank"><img className="tile" src={BakersBurns} alt="BakersBurns" /></a>
                <a href="https://thrive.tezzeraktmedia.space" target="_blank"><img className="tile" src={ThrivePersonology} alt="ThrivePersonology" /></a>
              </div>
              {canScrollRight && <button className="scroll-button right" onClick={() => scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })}>▶</button>}
            </motion.div>
          )}
        </AnimatePresence>

        <section id="music" className={`portfolio-section ${flipMusic ? 'flip' : ''}`} onClick={() => toggleFlip('music')}>
          <div className="front">
            <h2>Music Production</h2>
            <div className="music-links">
          <a href="https://open.spotify.com/artist/7xw1rXws8fauJeu9xLcUvL" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faSpotify} size="2x" color="white"/>
          </a>
          <a href="https://music.apple.com/us/artist/id1675921847" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faApple} size="2x" color="white" />
          </a>
          <a href="https://www.youtube.com/watch?v=_lK9tJbNQVM&list=OLAK5uy_nlQrbzvMJlJ_BItArcovVk9UW9oJ_-4xY" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} size="2x" color="white" />
          </a>
          <a href="https://soundcloud.com/trentyn-nicholas-2276389/sets/coagulum-1" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faSoundcloud} size="2x" color="white" />
          </a>
        </div>
          </div>
          <Link to="/music">
            <div className="back">
              <h2>Tools & Technologies</h2>
              <p>Logic Pro, Ozone9</p>
            </div>
          </Link>
        </section>

        <section id="3d-design" className={`portfolio-section ${flipDesign ? 'flip' : ''}`} onClick={() => toggleFlip('design')}>
          <div className="front">
            <h2>3D/Visual Design</h2>
          </div>
          <div className="back">
            <h2>Tools & Technologies</h2>
            <p>Blender, Fusion 360, Davinci Resolve</p>
          </div>
        </section>
        <div style={{paddingBottom: '100px'}}>

        <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default PortfolioOverlay;
