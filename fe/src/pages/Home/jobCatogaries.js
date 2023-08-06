import React from "react";
import { Col, Row, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { DEFAULT_IMG, URL_IMG, onErrorImg } from "../../services/common";

const Jobcatogaries = (props) => {

  return (
    <React.Fragment>
      <section className="section">
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <div className="section-title text-center">
                <h3 className="title">Top công ty</h3>
                <p className="text-muted">Tổng hợp Các công ty và số lượng topic chủ đề</p>
              </div>
            </Col>
          </Row>

          <Row>
            {(props.companies || []).map((item, key) => (
              <Col md={3} mt={4} pt={2} key={key}>
                <div className="popu-category-box rounded text-center">
                  <div className="popu-category-icon icons-md">
                    {/* <Icon icon={item.icon} className="text-primary" /> */}
					<img className="w-100" 
					style={{border: '0.5px solid', borderRadius: '10px'}} 
					src={URL_IMG + item.logo || DEFAULT_IMG} onError={onErrorImg}/>
                  </div>
                  <div className="popu-category-content mt-4">
                    <Link to={'/topic-company/'+ item.id} className="text-dark stretched-link">
                      <h5 className="fs-18">{item.name}</h5>
                    </Link>
                    <p className="text-muted mb-0">{item.total_topic} Topic</p>
                  </div>
                </div>
              </Col>
            ))}
			
          </Row>
          <Row>
            <Col md={12}>
              <div className="mt-5 text-center">
                <Link
                  to="/companies"
                  className="btn btn-primary btn-hover"
                >
                  Xem tất cả <i className="uil uil-arrow-right"></i>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Jobcatogaries;
