import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <FaPhone className="info-icon" />
            <h3>Phone</h3>
            <p>+1 234 567 890</p>
          </div>
          <div className="info-card">
            <FaEnvelope className="info-icon" />
            <h3>Email</h3>
            <p>contact@yourstore.com</p>
          </div>
          <div className="info-card">
            <FaMapMarkerAlt className="info-icon" />
            <h3>Address</h3>
            <p>123 Store Street, City, Country</p>
          </div>
          <div className="info-card">
            <FaClock className="info-icon" />
            <h3>Working Hours</h3>
            <p>Mon - Fri: 9AM - 6PM</p>
          </div>
        </div>

        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .contact-header h1 {
          font-size: 2.5rem;
          color: #232f3e;
          margin-bottom: 1rem;
        }

        .contact-header p {
          color: #666;
          font-size: 1.1rem;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }

        .contact-info {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .info-card {
          background: #f8f9fa;
          padding: 2rem;
          border-radius: 10px;
          text-align: center;
          transition: transform 0.3s ease;
        }

        .info-card:hover {
          transform: translateY(-5px);
        }

        .info-icon {
          font-size: 2rem;
          color: #febd69;
          margin-bottom: 1rem;
        }

        .info-card h3 {
          color: #232f3e;
          margin-bottom: 0.5rem;
        }

        .contact-form-container {
          background: #fff;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        input, textarea {
          width: 100%;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        textarea {
          height: 150px;
          resize: vertical;
        }

        input:focus, textarea:focus {
          outline: none;
          border-color: #febd69;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          background: #232f3e;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .submit-btn:hover {
          background: #febd69;
        }

        @media (max-width: 992px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .contact-container {
            padding: 2rem 1rem;
          }

          .contact-info {
            grid-template-columns: 1fr;
          }

          .contact-header h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;