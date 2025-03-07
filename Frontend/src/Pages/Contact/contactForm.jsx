import React, { useState } from "react";
import {registerApi} from "../../config/axios";
import "./contactForm.css";


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // Status feedback

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
  
    try {
      // Use the relative endpoint; the baseURL is already set in registerApi
      const response = await registerApi.post("/api/email", formData);
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("❌ Failed to send message. Try again.");
    }
  };
  
  return (
    <div className="contact-form-wrapper">
      <h2 className="contact-title">Get in Touch</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Write your message..."
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" className="contact-submit">
          Send Message
        </button>
      </form>
      {status && <p className="form-status">{status}</p>}
    </div>
  );
};

export default ContactForm;
