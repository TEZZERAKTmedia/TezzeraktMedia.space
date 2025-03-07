import React, { useState, useRef, useEffect } from 'react';
import introVideoSrc from '../../assets/INTRO1000.webm';
import loopVideoSrc from '../../assets/LOOP4000.webm';
import PortfolioOverlay from './PortfolioOverlay.jsx';
import './Portfolio.css';

function PortfolioPage() {
  const [introFinished, setIntroFinished] = useState(false);
  const introVideoRef = useRef(null);
  const loopVideoRef = useRef(null);

  useEffect(() => {
    if (introFinished && loopVideoRef.current) {
      loopVideoRef.current.play();
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
      {/* Background Video */}
      {!introFinished && (
        <video
          ref={introVideoRef}
          className="overlay-video fade-in"
          autoPlay
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
        >
          <source src={introVideoSrc} type="video/webm" />
        </video>
      )}
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

      {/* Portfolio Overlay */}
      <PortfolioOverlay />
    </div>
  );
}

export default PortfolioPage;
