import React, { useState, useEffect, useRef } from 'react';
import { useVideo } from '../VideoContext';
import '../Global.css';
import introVideoSrc from '../assets/IntroRight.webm';
import loopVideoSrc from '../assets/LoopRight.webm';

import '../components/VideoManager.css';
import '../components/LatestTrack.css';

import ContactForm from '../components/contactForm';

function PortfolioPage() {




  return (
    <div className="body">
     
    <div className='form-container'>
      
    
      
    <ContactForm/>
    </div>
    </div>
  );
}


export default PortfolioPage;
