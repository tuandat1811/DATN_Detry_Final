import React from "react";
import { Col, Container, Row, Form } from "reactstrap";
// import {Link} from "react-router-dom";
import processImage2 from "../../../assets/images/process-02.png";

const section = () => {
  return (
    <React.Fragment>
      <section className="bg-home2 pt-5" style={{ marginTop: "100px"}} id="home">
        <Container>
          <Row className="align-items-center">
            <Col md={7}>
              <div className="mb-4 pb-3 me-lg-5">
                <h1 className="display-5 fw-semibold mb-3">
                  Find your dream{" "}
                  <span className="text-primary fw-bold">Detry</span>
                </h1>
                <p className="lead text-muted mb-0">
                  Step into the role of a valued tester at Detry and shape the future of digital experiences. Join our diverse and vibrant community of users, where your opinions and actions matter. From the comfort of your own space, participate in exciting usability tests for websites, apps, and prototypes, all while providing invaluable feedback. Your voice guides businesses towards user-centric solutions, making a real impact on the products you love. Embrace the joy of testing, the thrill of discovery, and the satisfaction of knowing you're a vital part of the user-driven revolution at Detry
                </p>
              </div>
            </Col>

            <Col md={5}>
              <div className="mt-5 mt-md-0">
                <img src={processImage2} alt="" className="home-img" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default section;
