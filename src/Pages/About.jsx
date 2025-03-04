import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import { useVideo } from '../VideoContext'; // Ensure this path is correct
import introVideoSrc from '../assets/LOOP4000.webm'; // Path to the intro video
import loopVideoSrc from '../assets/LOOP4000.webm'; // Path to the looping video
import '../components/css/About.css';

function AboutPage() {
  const { introPlayed, setIntroPlayed } = useVideo();
  const [currentVideo, setCurrentVideo] = useState(introPlayed ? loopVideoSrc : introVideoSrc);
  const form = useRef(null);

  const handleIntroVideoEnd = () => {
    setIntroPlayed(true);
    setCurrentVideo(loopVideoSrc);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_uk1tgor', 'template_1ocsafv', form.current, 'FF0xIjAlMKuW5-8Dd')
      .then((result) => {
          console.log(result.text);
          alert("Message sent successfully!");
      }, (error) => {
          console.log(error.text);
          alert("An error occurred, please try again.");
      });

    e.target.reset();
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentVideo]);

  const videoRef = useRef(null);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        className="overlay-video"
        autoPlay
        muted
        playsInline
        loop={currentVideo === loopVideoSrc}
        onEnded={currentVideo === introVideoSrc ? handleIntroVideoEnd : undefined}
      >
        <source src={currentVideo} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      
      <div className="about-container">
        <div className="about-section">
          <h1>About Us</h1>
          <p>Welcome to Tezzerakt Media!</p>
          <p>At Tezzerakt Media, we believe in the power of creativity and technology to transform ideas into reality. Our journey has been one of exploration and innovation, combining the best of digital artistry and modern web development. Here’s a glimpse into how we crafted our unique platform.</p>
          
          <h2>Crafting the Visual Experience with Blender</h2>
          <p>The stunning visual experience you see on our site is a product of meticulous design and 3D rendering using Blender. Blender, a powerful open-source 3D creation suite, allowed us to create a dynamic and immersive background that sets the tone for your visit.</p>
          
          <h3>Why Blender?</h3>
          <p>Blender provides a comprehensive suite of tools for modeling, texturing, lighting, and rendering. By leveraging these tools, we were able to create intricate designs and realistic textures that bring our digital environment to life. The process involved:</p>
          <ul>
            <li><strong>Modeling</strong>: Creating the 3D models that form the backbone of our visuals. This included everything from abstract shapes to more intricate designs.</li>
            <li><strong>Texturing</strong>: Applying detailed textures to the models to enhance their realism and visual appeal.</li>
            <li><strong>Lighting</strong>: Setting up lighting within the 3D scene to highlight key elements and create a compelling atmosphere.</li>
            <li><strong>Rendering</strong>: Generating high-quality images and animations from the 3D scene, which are then integrated into our website.</li>
          </ul>
          
          <h2>Innovating with a Dynamic Music Player</h2>
          <p>Music is at the heart of Tezzerakt Media, and our music player is designed to offer a seamless and dynamic listening experience.</p>
          
          <h3>Dynamic Data Integration</h3>
          <p>Our music player dynamically uses data to generate and display music tracks. Here's how it works:</p>
          <ul>
            <li><strong>Data-Driven Design</strong>: The music player fetches data in real-time from our database, including track names, cover art, and streaming links. This ensures that the latest tracks are always available.</li>
            <li><strong>Seamless Playback</strong>: Using advanced web technologies, we built a player that offers smooth and uninterrupted playback. Whether you're streaming from Spotify, Apple Music, or YouTube Music, our player integrates these services effortlessly.</li>
            <li><strong>Interactive Features</strong>: Users can shuffle tracks, view detailed information about each song, and enjoy a visually synchronized experience as the player dynamically updates based on the current track.</li>
          </ul>
          
          <h3>Technologies Used</h3>
          <ul>
            <li><strong>React</strong>: For building a responsive and interactive user interface.</li>
            <li><strong>WaveSurfer.js</strong>: To visualize audio waveforms and enhance the user experience.</li>
            <li><strong>APIs</strong>: Integration with various music streaming APIs to fetch and display track data.</li>
          </ul>
          
          <h2>Join Us on This Journey</h2>
          <p>At Tezzerakt Media, we are constantly pushing the boundaries of what’s possible with digital art and technology. Our commitment to innovation drives us to explore new tools and techniques, ensuring that we deliver a unique and engaging experience to our users.</p>
          <p>We invite you to explore our platform, enjoy the immersive backgrounds created with Blender, and experience the dynamic capabilities of our music player. Thank you for being a part of our journey.</p>
          
          <h2>Contact Us</h2>
          <div className="contact-form-container">
            <form ref={form} onSubmit={sendEmail}>
              <input type="text" name="from_name" placeholder="Your Name" required />
              <input type="email" name="from_email" placeholder="Your Email" required />
              <textarea name="message" placeholder="Your Message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
