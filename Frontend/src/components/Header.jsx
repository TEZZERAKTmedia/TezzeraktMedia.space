import React from 'react';
import { Link } from 'react-router-dom';
import PlayBar from '../Pages/Music/PlaybackBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faApple, faYoutube, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import './Header.css'; // Make sure to create a corresponding CSS file for styles

function Header() {
  return (
    <div className="header-wrapper">
      <header className="main-header">
        {/* Wrap h1 with Link to create a clickable area that navigates to '/' */}
        <h1 className="logo">
          <Link to="/" style={{ height: '20px', color: 'inherit', textDecoration: 'none' }}>Tezzerakt Media</Link>
        </h1>

        <nav>
          <ul className="nav-links">
            {/* <li><Link to="/portfolio">Portfolio</Link></li> */}
            <li><Link to="/music">Music</Link></li>
            
            <li><Link to="/">Home</Link></li>
            {/* <li><Link to="/contact">Contact</Link></li> */}
          </ul>
        </nav>

        

        <PlayBar />
      </header>
    </div>
  );
}

export default Header;
