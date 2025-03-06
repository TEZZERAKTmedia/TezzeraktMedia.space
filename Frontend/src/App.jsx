import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VideoProvider } from './VideoContext';
import { MediaProvider, useMedia } from './Context/MediaContext';
import Header from './components/Header';
import Home from './components/Home';
import MusicPage from './Pages/Music';
import ContactPage from './Pages/Contact';
import PortfolioPage from './Pages/Portfolio';
import AboutPage from './Pages/About';
import RedirectOnRefresh from './components/RedirectOnRefresh';

import '../src/Global.css';

function App() {
  return (
    <VideoProvider>
      <MediaProvider>
        <Router>
          <RedirectOnRefresh />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<MusicPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
          {/* Ensure an audio element is included */}
          <AudioElement />
          
        </Router>
      </MediaProvider>
    </VideoProvider>
  );
}

// Separate component for the audio element
const AudioElement = () => {
  const { audioRef } = useMedia();
  return <audio ref={audioRef} />;
};

export default App;
