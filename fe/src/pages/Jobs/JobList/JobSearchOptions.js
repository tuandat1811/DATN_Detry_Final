import React from "react";
import { Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Input, Row } from "reactstrap";

const JobSearchOptions = () => {
  return (
    <React.Fragment>
      <div className="job-list-header">
        <Form action="#">
          <Row className="g-2">
            <Col md={3} md={6}>
              <div className="filler-job-form">
                <i className="uil uil-briefcase-alt"></i>
                <Input
                  type="search"
                  className="form-control filter-input-box"
                  id="exampleFormControlInput1"
                  placeholder="Job, company... "
                  style={{ marginTop: "-10px" }}
                />
              </div>
            </Col>
            <Col md={3} md={6}>
              <Link to="#" className="btn btn-primary w-100">
                <i className="uil uil-filter"></i> Fliter
              </Link>
            </Col>
          </Row>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default JobSearchOptions;
