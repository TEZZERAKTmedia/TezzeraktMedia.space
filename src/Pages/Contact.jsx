import React, { useState, useEffect, useRef } from 'react';
import { useVideo } from '../VideoContext'; // Ensure this path is correct
 // Path to the looping video
import Header from '../components/Header';
import PortfolioOverlay from'./PortfolioOverlay';
import '../Global.css';

import '../components/css/VideoManager.css';
import '../components/css/LatestTrack.css';


function PortfolioPage() {
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
    <div className="body">
      <Header  />
      <PortfolioOverlay  />
    <div className="video-container">
      
    
      
      <video
        ref={videoRef}
        className="overlay-video"
        autoPlay
        muted
        loop={currentVideo === loopVideoSrc}
        onEnded={currentVideo === introVideoSrc ? handleIntroVideoEnd : undefined}
      >
        <source src={currentVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    </div>
  );
}


export default PortfolioPage;
