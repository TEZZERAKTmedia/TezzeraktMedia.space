import React, { useEffect, useRef } from 'react';
import { useMusicPlayer } from '../Context/MusicPlayerContext';

const MusicPlayer = () => {
  const { currentTrack } = useMusicPlayer();
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.url;
      audioRef.current.play();
    }
  }, [currentTrack]);

  return (
    <div className="music-player">
      <audio ref={audioRef} controls />
      {currentTrack && <div>Now Playing: {currentTrack.title}</div>}
    </div>
  );
};

export default MusicPlayer;
