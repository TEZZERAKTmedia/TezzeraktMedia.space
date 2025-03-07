import React, { useState, useEffect, useRef } from 'react';
import introVideoSrc from '../../assets/INTRO1000.webm';
import loopVideoSrc from '../../assets/LOOP4000.webm';
import PortfolioOverlay from './PortfolioOverlay.jsx';

import './VideoManager.css';

function Home() {
  const [introFinished, setIntroFinished] = useState(false);
  const introVideoRef = useRef(null);
  const loopVideoRef = useRef(null);

  useEffect(() => {
    if (introFinished && loopVideoRef.current) {
      loopVideoRef.current.play(); // Play the loop video immediately
    }
  }, [introFinished]);

  const handleTimeUpdate = () => {
    if (introVideoRef.current) {
      const remainingTime = introVideoRef.current.duration - introVideoRef.current.currentTime;
      if (remainingTime < 0.5) {
        setIntroFinished(true);
      }
    }
  };

  return (
    <div className="video-container">
      <div className='body'>
      <PortfolioOverlay className="component-overlay" />
      </div>

      {/* Intro Video - Always plays on reload */}
      {!introFinished && (
        <video
          ref={introVideoRef}
          className={`overlay-video ${introFinished ? "fade-out" : ""}`}
          autoPlay
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
        >
          <source src={introVideoSrc} type="video/webm" />
        </video>
      )}

      {/* Looping Video (Preloaded and hidden initially) */}
      <video
        ref={loopVideoRef}
        className={`overlay-video ${introFinished ? "fade-in" : "hidden"}`}
        autoPlay
        muted
        playsInline
        loop
      >
        <source src={loopVideoSrc} type="video/webm" />
      </video>
    </div>
  );
}

export default Home;
