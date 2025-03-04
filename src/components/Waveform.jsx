// components/Waveform.jsx
import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { useMedia } from '../Context/MediaContext';

const Waveform = () => {
  const { audioRef, seekTo, currentTrack, isPlaying, nextTrack } = useMedia();
  const waveformRef = useRef(null);
  const waveSurferRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!waveSurferRef.current && waveformRef.current && audioRef.current) {
      waveSurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'violet',
        progressColor: '#333',
        cursorColor: '#333',
        barWidth: 1,
        height: 30,
        responsive: true,
        backend: 'MediaElement',
      });

      waveSurferRef.current.load(audioRef.current);

      waveSurferRef.current.on('ready', () => {
        setIsReady(true);
      });

      waveSurferRef.current.on('seek', (progress) => {
        const newTime = waveSurferRef.current.getDuration() * progress;
        seekTo(newTime);
      });

      waveSurferRef.current.on('finish', () => {
        nextTrack();
      });

      waveSurferRef.current.on('error', (e) => {
        console.error('WaveSurfer error:', e);
      });
    }

    return () => {
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
        waveSurferRef.current = null;
      }
    };
  }, [audioRef, seekTo, nextTrack]);

  useEffect(() => {
    if (waveSurferRef.current && currentTrack) {
      waveSurferRef.current.load(currentTrack.audio);
    }
  }, [currentTrack]);

  useEffect(() => {
    if (waveSurferRef.current && isReady) {
      if (isPlaying) {
        waveSurferRef.current.play();
      } else {
        waveSurferRef.current.pause();
      }
    }
  }, [isPlaying, isReady]);

  return <div ref={waveformRef} id="waveform" />;
};

export default Waveform;
