import React from "react";
import { Link } from "react-router-dom";
import { Col, Input, Row } from "reactstrap";

const JobGridHeader = () => {
  return (
    <React.Fragment>
      <form action="#">
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
      </form>
    </React.Fragment>
  );
};

export default JobGridHeader;
