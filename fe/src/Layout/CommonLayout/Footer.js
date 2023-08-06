import React from "react";
import { Row, Col, Container } from "reactstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  
  return (
    <React.Fragment>
      
      <div className="footer-alt">
        <Container>
          <Row>
            <Col md={12}>
              <p className="text-white-50 text-center mb-0">
                {new Date().getFullYear()} &copy; QL kiểm thử
                
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Footer;
