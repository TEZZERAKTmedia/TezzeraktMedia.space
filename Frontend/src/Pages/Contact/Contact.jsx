// ContactPage.jsx

import React, { useRef } from "react";
import loopVideoSrc from "../../assets/LoopRight.webm"; // Path to your loop video
import ContactForm from "./ContactForm"; // Import the ContactForm component
import "./ContactPage.css"; // CSS for styling

const ContactPage = () => {
  const videoRef = useRef(null);

  return (
    <div className="contact-page-container">
      {/* Background looping video */}
      <video
        ref={videoRef}
        className="contact-page-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={loopVideoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay form */}
      <div className="contact-form-overlay">
        <h2>Contact Me</h2>
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactPage;
