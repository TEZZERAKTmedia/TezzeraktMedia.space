import React, { useState, useEffect, useRef } from 'react';
import { useVideo } from '../Home/VideoContext'; // Ensure this path is correct
import introVideoSrc from '../../assets/LOOP4000.webm'; // Path to the intro video
import loopVideoSrc from '../../assets/LOOP4000.webm'; // Path to the looping video
import MusicPageOverlay from './MusicOverlay';
import '../Home/VideoManager.css';
import './LatestTrack.css';

function MusicPage() {
  const { introPlayed, setIntroPlayed } = useVideo();
  const [currentVideo, setCurrentVideo] = useState(introPlayed ? loopVideoSrc : introVideoSrc);
  
  const videoRef = useRef(null);

  const handleIntroVideoEnd = () => {
    console.log("Intro video ended");
    setIntroPlayed(true);
    setCurrentVideo(loopVideoSrc);
  };

  useEffect(() => {
    if (videoRef.current) {
      console.log("Loading video:", currentVideo);
      videoRef.current.load();
    }
  }, [currentVideo]);

  return (
    <div className="video-container">
      
      <video
        ref={videoRef}
        className="overlay-video"
        autoPlay
        muted
        playsInline
        loop={currentVideo === loopVideoSrc}
        onEnded={currentVideo === introVideoSrc ? handleIntroVideoEnd : undefined}
      >
        <source src={currentVideo} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <MusicPageOverlay />
    </div>
  );
}

export default MusicPage;
