// @ts-nocheck
import React, { useEffect, useState } from "react";
import {Container, Row, Col, Card, CardBody} from "reactstrap";
import {Link, useParams} from "react-router-dom";
import MenuLeft from "./MenuLeft";
import { NOT_FOUND } from "../../services/common";
import QuestionUser from "./Question/QuestionUser";
import TopicUser from "./Topic/TopicUser";
import AnswerUser from "./Answer/AnswerUser";


const children = [
   
	{
		component: <TopicUser/>,
		type: 'topics',
		title: 'Chủ đề'
	},
	{
		component: <QuestionUser/>,
		type: 'questions',
		title: 'Câu hỏi'
	},
	{
		component: <AnswerUser/>,
		type: 'answers',
		title: 'Đáp án '
	},

];

const UserVipPage = () => {
    document.title = "User | QL";
	const menu = [
		
        {
            id: 1,
            name: "Quản lý topic",
            path : '/user-vip/topics',
			type: 'topics',
        },
        {
            id: 2,
            name: "Quản lý câu hỏi",
            path : '/user-vip/questions',
			type: 'questions',
        },
		{
            id: 3,
            name: "Quản lý đáp án",
            path : '/user-vip/answers',
			type: 'answers',
        },
    ];
	const params = useParams();

	useEffect(() => {
		if(!params.type) {
			window.location.href='/user-vip/topics';
		}
	}, [params.type])
    

	const genChildren = (type) => {
        if(!type) {
			window.location.href='/user-vip/topics';
		}
		return children.find(item => item.type === params.type);
	}
    return (
        <React.Fragment>
            <section className="page-title-box">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <div className="text-center text-white">
                                <h3 className="mb-4">Quản lý Nghiệp vụ</h3>
                                <div className="page-next">
                                    <nav className="d-inline-block" aria-label="breadcrumb text-center">
                                        <ol className="breadcrumb justify-content-center">
                                            <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                                            <li className="breadcrumb-item"><Link to="#">{genChildren(params.type)?.title ||''}</Link></li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <div className="position-relative" style={{zIndex: 1}}>
                <div className="shape">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250">
                        <path fill="#FFFFFF" fillOpacity="1"
                              d="M0,192L120,202.7C240,213,480,235,720,234.7C960,235,1200,213,1320,202.7L1440,192L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
                    </svg>
                </div>
            </div>
            <section className="section">
                <Container>
                    <Row>
                        <Col md={3}>
                            <div className="sidebar ms-lg-4 ps-lg-4 mt-5 mt-lg-0">
                                <MenuLeft menu={menu} type={params.type}/>
                            </div>
                        </Col>
                        <Col md={9}>
                            <div className="blog-post">
                                
                                <Row>
                                   {
									genChildren(params.type) ? genChildren(params.type).component : 
									<img src={NOT_FOUND} alt=""/>
								   }
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
};

export default UserVipPage;
