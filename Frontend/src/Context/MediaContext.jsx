import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import tracks from '../components/tracks';

const MediaContext = createContext();

export const useMedia = () => useContext(MediaContext);

export const MediaProvider = ({ children }) => {
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const latestTrack = tracks.find(track => track.apiKey === 'latest-track-api-key');
    if (latestTrack) {
      setCurrentTrackId(latestTrack.id);
    }

    const handleEnded = () => {
      nextTrack();
    };

    const updateCurrentTime = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    audioRef.current.addEventListener('ended', handleEnded);
    audioRef.current.addEventListener('timeupdate', updateCurrentTime);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.removeEventListener('timeupdate', updateCurrentTime);
      }
    };
  }, []);

  const currentTrack = tracks.find(track => track.id === currentTrackId);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.audio;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error('Error playing:', e));
      }
    }
  }, [currentTrack]);

  const playTrack = (id) => {
    setCurrentTrackId(id);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error('Error playing:', e));
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error('Error playing:', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const seekTo = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const nextTrack = () => {
    setCurrentTrackId(prevId => (prevId === tracks.length ? 1 : prevId + 1));
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error('Error playing:', e));
    }
  };

  const prevTrack = () => {
    setCurrentTrackId(prevId => (prevId === 1 ? tracks.length : prevId - 1));
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error('Error playing:', e));
    }
  };

  return (
    <MediaContext.Provider value={{ currentTrack, playTrack, togglePlay, seekTo, isPlaying, audioRef, nextTrack, prevTrack }}>
      {children}
    </MediaContext.Provider>
  );
};
