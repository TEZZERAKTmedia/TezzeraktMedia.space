import React from 'react';
import './css/LatestTrack.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useMedia } from '../Context/MediaContext';

const MediaPlayer = () => {
  const { currentTrack } = useMedia();

  if (!currentTrack) {
    return <div>Loading...</div>;
  }

  return (
    <div className="media-player-container">
      <img src={currentTrack.coverArt} alt="Cover Art" className="cover-art" />
      <h2>{currentTrack.title}</h2>
      <div className="track-links">
        <a href={currentTrack.appleMusic} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faApple} /> Apple Music
        </a>
        <a href={currentTrack.spotify} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faSpotify} /> Spotify
        </a>
        <a href={currentTrack.youtubeMusic} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faYoutube} /> YouTube Music
        </a>
      </div>
    </div>
  );
};

export default MediaPlayer;
