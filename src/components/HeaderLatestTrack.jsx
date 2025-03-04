import React from 'react';
import './css/HeaderLatestTrack.css'; // Updated CSS file path
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons';

import { Link } from 'react-router-dom';

const HeaderLatestTrack = ({ track }) => { // Changed component name to HeaderLatestTrack
    return (
        <div className="header-latest-track-container"> {/* Changed class name */}
         <Link to="/music">
            <img src={trackCoverArt} alt="Latest Track Cover Art" className="header-cover-art"/> {/* Changed class name */}
            </Link>
            
           
            
        </div>
    );
}

export default HeaderLatestTrack; // Changed component name in export
