import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

//import Images
import Error403Image from "../../assets/images/404.png";

const Error403 = () => {
  document.title = "Error 404 ";
  return (
    <React.Fragment>
      <div>
        <div className="main-content">
          <div className="page-content">
            <section className="bg-error bg-auth text-dark">
              <Container>
                <Row className="justify-content-center">
                  <Col md={6}>
                    <div className="text-center">
                      <div className="mt-5">
						<h2 className="text-danger">403</h2>
                        <h4 className="text-uppercase mt-3">
                          Bạn không có quyền truy cập
                        </h4>
                       
                        <div className="mt-4">
                          <Link
                            className="btn btn-primary waves-effect waves-light"
                            to="/"
                          >
                            <i className="mdi mdi-home"></i> Back to Home
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Error403;
