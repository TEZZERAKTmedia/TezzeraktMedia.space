import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faPlay, faPause, faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { useMedia } from '../Context/MediaContext';
import '../components/css/PlaybackBar.css';
import { motion, AnimatePresence } from 'framer-motion';

const PlayBar = () => {
  const { isPlaying, nextTrack, prevTrack, togglePlay, currentTrack, seekTo, audioRef } = useMedia();
  const [flipped, setFlipped] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(0); // Tracks which message to display
  const [isVisible, setIsVisible] = useState(true); // Controls fade-in/fade-out of messages

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleTogglePlay = () => {
    togglePlay();
  };

  const handleSeek = (event) => {
    const seekTime = (event.target.value / 100) * audioRef.current.duration;
    seekTo(seekTime);
  };

  useEffect(() => {
    const updateCurrentTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateCurrentTime);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateCurrentTime);
      }
    };
  }, [audioRef]);

  const messages = [
    'Now streaming on all platforms!',
    '(or click to listen here now)',
  ];

  useEffect(() => {
    // Show each message one after another without looping
    const showNextMessage = () => {
      setIsVisible(true); // Fade in

      // Hold the message visible for 5 seconds
      const holdTimeout = setTimeout(() => {
        setIsVisible(false); // Start fade out

        // After fade-out, move to the next message if there is one
        if (visibleIndex < messages.length - 1) {
          setTimeout(() => {
            setVisibleIndex((prevIndex) => prevIndex + 1);
            setIsVisible(true); // Fade in the next message
          }, 1000); // Short gap between fade-out and next message
        }
      }, 5000); // Display each message for 5 seconds

      return () => clearTimeout(holdTimeout);
    };

    const cleanup = showNextMessage();
    return () => cleanup();
  }, [visibleIndex]);

  // Framer Motion animation variants for each letter
  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }, // Smooth fade-out animation
  };

  return (
    <div className={`playback-bar-container ${flipped ? 'flipped' : ''}`}>
      {/* Front Side with Video Background */}
      <div className="playback-bar-front" onClick={handleFlip} style={{ position: 'fixed', overflow: 'hidden' }}>
        <video
          src="/COAGULUM.webm"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        />

        {/* Overlay Messages with AnimatePresence for fade-in/out */}
        <div style={{ position: 'relative', textAlign: 'center', color: 'white', fontSize: '1rem', fontWeight: 'bold' }}>
          <AnimatePresence>
            {isVisible && messages[visibleIndex] && // Check if message exists
              messages[visibleIndex].split('').map((char, index) => (
                <motion.span
                  key={`${visibleIndex}-${index}`}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={letterAnimation}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  style={{ display: 'inline-block' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))
            }
          </AnimatePresence>
        </div>
      </div>

      {/* Back Side */}
      <div className="playback-bar-back" >
        <div onClick={handleFlip}>
        {currentTrack && (
          <>
            <div className="track-info">
              <div className="track-title">{currentTrack.title}</div>
              <img src={currentTrack.coverArt} alt={currentTrack.title} className="play-bar-cover-art" />
            </div>
          </>
        )}
        </div>
        <div className="play-bar">
          <button onClick={prevTrack}>
            <FontAwesomeIcon icon={faBackwardStep} />
          </button>
          <button onClick={handleTogglePlay}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          <button onClick={nextTrack}>
            <FontAwesomeIcon icon={faForwardStep} />
          </button>
          {currentTrack && (
            <input
              type="range"
              className="scrub-bar"
              value={(currentTime / audioRef.current.duration) * 100 || 0}
              onChange={handleSeek}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayBar;
