import React from 'react';
import { Link } from 'react-router-dom';
import PlayBar from './PlaybackBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faApple, faYoutube, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import './css/Header.css'; // Make sure to create a corresponding CSS file for styles

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
            <li><Link to="/about">About</Link></li>
            {/* <li><Link to="/contact">Contact</Link></li> */}
          </ul>
        </nav>

        <div className="music-links">
          <a href="https://open.spotify.com/artist/7xw1rXws8fauJeu9xLcUvL" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faSpotify} size="2x" color="white"/>
          </a>
          <a href="https://music.apple.com/us/artist/id1675921847" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faApple} size="2x" color="white" />
          </a>
          <a href="https://www.youtube.com/watch?v=_lK9tJbNQVM&list=OLAK5uy_nlQrbzvMJlJ_BItArcovVk9UW9oJ_-4xY" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} size="2x" color="white" />
          </a>
          <a href="https://soundcloud.com/trentyn-nicholas-2276389/sets/coagulum-1" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faSoundcloud} size="2x" color="white" />
          </a>
        </div>

        <PlayBar />
      </header>
    </div>
  );
}

export default Header;
