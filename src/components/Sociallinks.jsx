import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const SocialLinks = () => {
  return (
    <div className="social-links">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
    </div>
  );
};

export default SocialLinks;