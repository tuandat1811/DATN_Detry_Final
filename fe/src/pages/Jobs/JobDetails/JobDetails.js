import React from "react";
import { Col, Container, Row } from "reactstrap";
import JobDetailsDescription from "./JobDetailsDescription";
import JobVacancyPost from "./JobVacancyPost";
import {Link} from "react-router-dom";

const JobDetails = () => {
    document.title = "Làm bài";
    return (
        <React.Fragment>
            <section className="page-title-box">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <div className="text-center text-white">
                                <h3 className="mb-4">Bạn biết gì về cty?</h3>
                                <div className="page-next">
                                    <nav
                                        className="d-inline-block"
                                        aria-label="breadcrumb text-center"
                                    >
                                        <ol className="breadcrumb justify-content-center">
                                            <li className="breadcrumb-item">
                                                <Link to="/">Trang chủ</Link>
                                            </li>
                                            <li className="breadcrumb-item">
                                                <Link to="#">Chủ đề</Link>
                                            </li>
                                            <li
                                                className="breadcrumb-item active"
                                                aria-current="page"
                                            >
                                                {" "}
                                                Chi tiết {" "}
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="section">
                <Container>
                    <Row>
                        <Col md={12}>
                            <JobDetailsDescription />
                            <JobVacancyPost />
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
};

export default JobDetails;
