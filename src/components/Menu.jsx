import React, { useState, useEffect, useRef } from 'react';
import introVideo from '../assets/Videos/New/INTRO.mp4';
import BLOGOPEN from '../assets/Videos/New/BLOGOPEN.mp4';
import BLOGCLOSE from '../assets/Videos/New/BLOGCLOSE.mp4';
import CONTACTOPEN from '../assets/Videos/New/CONTACTOPEN.mp4';
import CONTACTCLOSE from '../assets/Videos/New/CONTACTCLOSE.mp4';
import GALLLERYOPEN from '../assets/Videos/New/GALLERYOPEN.mp4';

function Menu() {
  const [currentVideo, setCurrentVideo] = useState(introVideo);
  const [isOverlaySequenceComplete, setIsOverlaySequenceComplete] = useState(true);
  const [isSocialSequenceComplete, setIsSocialSequenceComplete] = useState(true);
  const [isOverlayActive, setIsOverlayActive] = useState(false); // Track if Overlay is currently active
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (currentVideo && videoRef.current) {
      setVideoPlaying(true);
      videoRef.current.src = currentVideo;
      videoRef.current.play().catch(error => console.error("Video play failed", error));
    }
  }, [currentVideo]);

  const handleVideoEnd = () => {
    setVideoPlaying(false);
    if (currentVideo === BLOGCLOSE || currentVideo === CONTACTCLOSE || currentVideo === GALLERYOPEN) {
      setIsOverlaySequenceComplete(true);
      setIsOverlayActive(false); // Overlay is no longer active once closed
    }
    if (currentVideo === BLOGOPEN || currentVideo === CONTACTOPEN) {
      setIsOverlayActive(true); // Overlay becomes active after opening
    }
    if (currentVideo === CONTACTCLOSE) {
      setIsSocialSequenceComplete(true);
    }
  };

  const toggleOverlayVideo = () => {
    if (!videoPlaying && isSocialSequenceComplete) {
      const nextVideo = isOverlaySequenceComplete ? BLOGOPEN : BLOGCLOSE;
      setCurrentVideo(nextVideo);
      setIsOverlaySequenceComplete(!isOverlaySequenceComplete);
    }
  };

  const toggleSocialVideo = () => {
    if (!videoPlaying && isOverlaySequenceComplete) {
      const nextVideo = isSocialSequenceComplete ? CONTACTOPEN : CONTACTCLOSE;
      setCurrentVideo(nextVideo);
      setIsSocialSequenceComplete(!isSocialSequenceComplete);
    }
  };

  return (
    <div className="video-container">
      <video ref={videoRef} className="overlay-video" autoPlay muted onEnded={handleVideoEnd}>
        <source src={currentVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="button-container">
        <button className="menubutton" onClick={toggleOverlayVideo} disabled={!isSocialSequenceComplete || videoPlaying}>Toggle Overlay</button>
        {/* Adjust button enabled state based on isOverlayActive */}
        {isOverlayActive && (
          <>
            <button className='menubuttons1' onClick={() => setCurrentVideo(BLOGOPEN)}>Blog</button>
            <button className='menubuttons2' onClick={() => setCurrentVideo(CONTACTOPEN)}>Contact</button>
            <button className='menubuttons3' onClick={() => setCurrentVideo(GALLLERYOPEN)}>Gallery</button>
          </>
        )}
        <button className="socialbutton" onClick={toggleSocialVideo} disabled={!isOverlaySequenceComplete || videoPlaying}>Toggle Social</button>
      </div>
    </div>
  );
}

export default Menu;
