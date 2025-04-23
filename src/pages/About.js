import React from 'react';
import { FaHeart, FaShoppingBag, FaTruck, FaHeadset } from 'react-icons/fa';

const About = () => {
  return (
    <div className="about-container">
      <div className="hero-section">
        <h1>Our Story</h1>
        <p>Bringing Quality Products to Your Doorstep</p>
      </div>

      <div className="content-section">
        <div className="mission-vision">
          <div className="mission">
            <h2>Our Mission</h2>
            <p>To provide exceptional shopping experiences through quality products, excellent service, and innovative solutions that enhance our customers' lives.</p>
          </div>
          <div className="vision">
            <h2>Our Vision</h2>
            <p>To become the most trusted and preferred shopping destination by delivering value and excellence in every interaction.</p>
          </div>
        </div>

        <div className="values-section">
          <h2>Why Choose Us</h2>
          <div className="values-grid">
            <div className="value-card">
              <FaHeart className="value-icon" />
              <h3>Quality First</h3>
              <p>We carefully curate each product to ensure the highest quality standards.</p>
            </div>
            <div className="value-card">
              <FaShoppingBag className="value-icon" />
              <h3>Best Deals</h3>
              <p>Competitive prices and regular deals to give you the best value.</p>
            </div>
            <div className="value-card">
              <FaTruck className="value-icon" />
              <h3>Fast Delivery</h3>
              <p>Quick and reliable shipping to get your products to you on time.</p>
            </div>
            <div className="value-card">
              <FaHeadset className="value-icon" />
              <h3>24/7 Support</h3>
              <p>Our dedicated team is always here to help you with any questions.</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-container {
          min-height: 100vh;
          background: #fff;
        }

        .hero-section {
          background: linear-gradient(rgba(35, 47, 62, 0.9), rgba(35, 47, 62, 0.9)),
                      url('/about-bg.jpg') center/cover;
          height: 400px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
          text-align: center;
          padding: 0 20px;
        }

        .hero-section h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
        }

        .hero-section p {
          font-size: 1.2rem;
          max-width: 600px;
        }

        .content-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 20px;
        }

        .mission-vision {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .mission, .vision {
          padding: 2rem;
          background: #f8f9fa;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .mission h2, .vision h2 {
          color: #232f3e;
          margin-bottom: 1rem;
        }

        .values-section {
          text-align: center;
        }

        .values-section h2 {
          margin-bottom: 3rem;
          color: #232f3e;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .value-card {
          padding: 2rem;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .value-card:hover {
          transform: translateY(-5px);
        }

        .value-icon {
          font-size: 2.5rem;
          color: #febd69;
          margin-bottom: 1rem;
        }

        .value-card h3 {
          color: #232f3e;
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: 2.5rem;
          }

          .mission-vision {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .values-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default About;