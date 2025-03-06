import React, { useState, useEffect, useRef } from 'react';
import { useVideo } from '../VideoContext'; // Ensure this path is correct
import introVideoSrc from '../assets/IntroRight.webm'; // Path to the intro video
import loopVideoSrc from '../assets/LoopRight.webm'; // Path to the looping video
import Header from '../components/Header';
import PortfolioOverlay from'./PortfolioOverlay';
import '../components/Portfolio.css';





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
    
    <div className="video-container">
      <div className='body'>
      
      <PortfolioOverlay className="component-overlay"/>
      </div>
      <video
        ref={videoRef}
        className="overlay-video"
        autoPlay
        muted
        playsInline
        loop={currentVideo === loopVideoSrc}
        onEnded={currentVideo === introVideoSrc ? handleIntroVideoEnd : undefined}
      >
        <source src={currentVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
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


export default PortfolioPage;
