import React, { useRef, useEffect } from 'react';
import { useMedia } from '../Context/MediaContext';
import tracks from './tracks';
import './css/MusicPageOverlay.css';

const MusicPageOverlay = () => {
  const { playTrack, currentTrack } = useMedia();
  const trackListRef = useRef(null);

  const centerTrackItems = () => {
    if (trackListRef.current) {
      const trackItems = Array.from(trackListRef.current.children);
      const viewportWidth = window.innerWidth;
      const firstItemWidth = trackItems[0].offsetWidth;
  
      // Calculate the offset needed to center the first item
      const offset = (viewportWidth / 2) - (firstItemWidth / 2);
  
      // Scroll the container to align the first item at the center of the viewport
      trackListRef.current.scrollLeft = -offset;
    }
  };
  

  useEffect(() => {
    centerTrackItems();
    window.addEventListener('resize', centerTrackItems);

    return () => window.removeEventListener('resize', centerTrackItems);
  }, []);

  return (
    <div className="music-page">
      <div className="carousel">
        <div className="track-list" ref={trackListRef}>
          {tracks.map(track => (
            <div key={track.id} className={`track-item ${track.id === currentTrack?.id ? 'active' : ''}`}>
              <img src={track.coverArt} alt={`${track.title} Cover Art`} className="cover-art" />
              <h3 style={{ color: 'white' }}>{track.title}</h3>
              <button className='track-tile-play-button' onClick={() => playTrack(track.id)}>Play</button>
              <div className="track-links">
                <a href={track.appleMusic} target="_blank" rel="noopener noreferrer">Apple Music</a>
                <a href={track.spotify} target="_blank" rel="noopener noreferrer">Spotify</a>
                <a href={track.youtubeMusic} target="_blank" rel="noopener noreferrer">YouTube Music</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPageOverlay;
