import React, { createContext, useContext, useState } from 'react';

const VideoContext = createContext();

export const useVideo = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
  const [introPlayed, setIntroPlayed] = useState(false);

  return (
    <VideoContext.Provider value={{ introPlayed, setIntroPlayed }}>
      {children}
    </VideoContext.Provider>
  );
};