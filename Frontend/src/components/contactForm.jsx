import React, { useState } from "react";
import axios from "axios";
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
      const API_URL =
        import.meta.env.MODE === "development"
          ? "http://localhost:3456/api/email"
          : "https://api.tezzeraktmedia.space/api/email";

      const response = await axios.post(API_URL, formData);
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
