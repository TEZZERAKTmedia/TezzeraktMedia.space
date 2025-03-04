import React, { useState, useEffect, useRef } from 'react';
import { useVideo } from '../VideoContext'; // Ensure this path is correct
import introVideoSrc from '../assets/INTRO1000.webm'; // Path to the intro video
import loopVideoSrc from '../assets/LOOP4000.webm'; // Path to the looping video
import PortfolioOverlay from '../Pages/PortfolioOverlay.jsx';

import Header from './Header.jsx';

import './css/VideoManager.css';
import './css/LatestTrack.css';



function Home() {
  const { introPlayed, setIntroPlayed } = useVideo();
  const [currentVideo, setCurrentVideo] = useState(introPlayed ? loopVideoSrc : introVideoSrc);
  
  const videoRef = useRef(null);

  // Dummy data for LatestTrack
  const track = {
    coverArt: "/path/to/coverArt.jpg",
    spotify: "https://open.spotify.com/artist/7xw1rXws8fauJeu9xLcUvL",
    appleMusic: "https://music.apple.com/us/artist/id1675921847",
    youtubeMusic: "https://music.youtube.com/channel/UCnqpcyA6u470xchpNKr01ng"
  };

  const handleIntroVideoEnd = () => {
    setIntroPlayed(true);
    setCurrentVideo(loopVideoSrc);
  };

  useEffect(() => {
    videoRef.current.load();
  }, [currentVideo]);

  return (
    
      
      
      
    <div className="video-container" >
      
      <PortfolioOverlay className="component-overlay"/>
      <video
        ref={videoRef}
        className="overlay-video"
        autoPlay 
        muted
        playsInline
        loop={currentVideo === loopVideoSrc}
        onEnded={currentVideo === introVideoSrc ? handleIntroVideoEnd : undefined}
      >
        <source src={introVideoSrc} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
    
  );
}


export default Home;
