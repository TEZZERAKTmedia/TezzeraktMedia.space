import React, { useState, useEffect, useRef } from 'react';
import { useVideo } from '../VideoContext'; // Ensure this path is correct
import introVideoSrc from '../assets/IntroRight.webm'; // Path to the intro video
import loopVideoSrc from '../assets/LoopRight.webm'; // Path to the looping video
import PortfolioOverlay from './PortfolioOverlay';
import '../components/css/Portfolio.css';

function PortfolioPage() {
  const { introPlayed, setIntroPlayed } = useVideo();
  const [currentVideo, setCurrentVideo] = useState(introPlayed ? loopVideoSrc : introVideoSrc);
  const videoRef = useRef(null);

  const handleIntroVideoEnd = () => {
    setIntroPlayed(true);
    setCurrentVideo(loopVideoSrc);
  };

  // 🔥 Force video reload when `currentVideo` changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Ensure video reloads when switching sources
      videoRef.current.play(); // Ensure autoplay after switching
    }
  }, [currentVideo]);

  return (
    <div className="video-container">
      <PortfolioOverlay className="component-overlay" />

      <video
        ref={videoRef}
        className="overlay-video"
        autoPlay
        muted
        playsInline
        loop={currentVideo === loopVideoSrc} // Loop only if it's the second video
        onEnded={currentVideo === introVideoSrc ? handleIntroVideoEnd : undefined}
      >
        <source src={currentVideo} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default PortfolioPage;
