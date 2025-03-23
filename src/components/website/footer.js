import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaLinkedin, FaMedium, FaTelegram } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';


const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#343a40', color: 'white', padding: '20px 0' }}>
      <Container>
        {/* Call-to-action Banner */}
        

        {/* Footer Content */}
        <Row>
          <Col md={3}>
            <h5>E-commerce © 2025</h5>
          </Col>
          <Col md={3}>
            <h5>Customers</h5>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>Buyer</li>
              <li>Supplier</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Pages</h5>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>Home</li>
              <li>Categories</li>
              <li>Products</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Further Information</h5>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </Col>
        </Row>

        {/* Social Media Icons */}
        <Row className="mt-4">
          <Col className="text-center">
            <h5>Follow us</h5>
            <FaFacebook size={30} style={{ margin: '0 10px' }} />
            <FaTwitter size={30} style={{ margin: '0 10px' }} />
            <FaLinkedin size={30} style={{ margin: '0 10px' }} />
            <FaMedium size={30} style={{ margin: '0 10px' }} />
            <FaTelegram size={30} style={{ margin: '0 10px' }} />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
