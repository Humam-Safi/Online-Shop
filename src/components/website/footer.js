import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-content">
          <Container>
            <Row className="footer-links">
              <Col md={3}>
                <h6>Get to Know Us</h6>
                <ul>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/careers">Careers</Link>
                  </li>
                  <li>
                    <Link to="/press">Press Releases</Link>
                  </li>
                  <li>
                    <Link to="/blog">Blog</Link>
                  </li>
                </ul>
              </Col>
              <Col md={3}>
                <h6>Make Money with Us</h6>
                <ul>
                  <li>
                    <Link to="/sell">Sell products</Link>
                  </li>
                  <li>
                    <Link to="/affiliate">Become an Affiliate</Link>
                  </li>
                  <li>
                    <Link to="/advertise">Advertise Your Products</Link>
                  </li>
                  <li>
                    <Link to="/vendor">Become a Vendor</Link>
                  </li>
                </ul>
              </Col>
              <Col md={3}>
                <h6>Customer Service</h6>
                <ul>
                  <li>
                    <Link to="/help">Help Center</Link>
                  </li>
                  <li>
                    <Link to="/returns">Returns</Link>
                  </li>
                  <li>
                    <Link to="/shipping">Shipping Info</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                </ul>
              </Col>
              <Col md={3}>
                <h6>Let Us Help You</h6>
                <ul>
                  <li>
                    <Link to="/account">Your Account</Link>
                  </li>
                  <li>
                    <Link to="/orders">Your Orders</Link>
                  </li>
                  <li>
                    <Link to="/wishlist">Your Wishlist</Link>
                  </li>
                  <li>
                    <Link to="/track">Track Packages</Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="footer-base">
          <Container>
            <div className="footer-bottom">
              <ul className="legal-links">
                <li>
                  <Link to="/conditions">Conditions of Use</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy Notice</Link>
                </li>
                <li>
                  <Link to="/cookies">Cookie Notice</Link>
                </li>
                <li>
                  <Link to="/interest-ads">Interest-Based Ads</Link>
                </li>
              </ul>
              <div className="copyright">
                © 1996-{new Date().getFullYear()}, E-commerce.com, Inc. or its
                affiliates
              </div>
            </div>
          </Container>
        </div>
      </footer>

      <style jsx>{`
        footer {
          background-color: #232f3e;
          color: #fff;
          font-size: 14px;
        }

        .footer-content {
          padding: 40px 0;
          background-color: #232f3e;
        }

        .footer-links h6 {
          color: #fff;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .footer-links ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links ul li {
          margin-bottom: 10px;
        }

        .footer-links ul li a {
          color: #ddd;
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-links ul li a:hover {
          color: #fff;
          text-decoration: underline;
        }

        .footer-base {
          background-color: #131a22;
          padding: 20px 0;
          font-size: 12px;
        }

        .footer-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .legal-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }

        .legal-links li a {
          color: #ddd;
          text-decoration: none;
        }

        .legal-links li a:hover {
          text-decoration: underline;
        }

        .copyright {
          color: #ddd;
        }

        @media (max-width: 768px) {
          .footer-links {
            text-align: center;
          }

          .footer-links h6 {
            margin-top: 20px;
          }

          .legal-links {
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
