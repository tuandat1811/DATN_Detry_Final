import React from "react";
import {Card, CardBody, Col, Label, Row} from "reactstrap";

//Import Images
import { Link } from "react-router-dom";
import jobImage1 from "../../../assets/images/featured-job/img-01.png";
import jobImage2 from "../../../assets/images/featured-job/img-02.png";
import jobImage3 from "../../../assets/images/featured-job/img-03.png";
import {Form} from "react-bootstrap";


const questions = [
    {
        id: 1,
        name: "Cty làm từ mấy giờ",
    },
    {
        id: 2,
        name: "Bạn biết gì về affiliate",
    },
    {
        id: 3,
        name: "",
    },
    {
        id: 4,
        name: "Cty làm từ mấy giờ",
    },
];

const JobDetailsDescription = () => {
    return (
        <React.Fragment>
            <Card className="job-detail overflow-hidden">
                <CardBody className="p-4">
                    <Form
                        method="post"
                        className="contact-form mt-4"
                        name="myForm"
                        id="myForm"
                    >
                        {questions.map((item, key) => (
                            <div className="mt-4">
                                <h5 className="mb-3">{item.name}</h5>
                                    <span id="error-msg"></span>
                                    <Row>
                                        <Col md={12}>
                                            <div className="mb-3">
                                                <textarea
                                                    className="form-control"
                                                    placeholder="Nội dung feedback ...."
                                                    name="name"
                                                    rows="3"
                                                ></textarea>
                                            </div>
                                        </Col>
                                    </Row>
                            </div>
                        ))}

                        <div className="">
                            <button
                                type="button"
                                id="submit"
                                name="submit"
                                className="btn btn-primary"
                            >
                                {" "}
                                Gủi dữ liệu <i className="uil uil-message ms-1"></i>
                            </button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default JobDetailsDescription;
