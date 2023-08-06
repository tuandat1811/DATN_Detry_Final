// @ts-nocheck
import React, { useEffect, useState } from "react";
import {Container, Row, Col, Card, CardBody} from "reactstrap";
import {Link, useParams} from "react-router-dom";
import CompanyAdmin from "./Company/CompanyAdmin";
import QuestionAdmin from "./Question/QuestionAdmin";
import TopicAdmin from "./Topic/TopicAdmin";
import UserPage from "./User/UserPage";
import MenuLeft from "./MenuLeft";
import { NOT_FOUND } from "../../services/common";


const children = [
    {
		component: <CompanyAdmin/>,
		type: 'companies',
		title: 'Công ty'
	},
	{
		component: <QuestionAdmin/>,
		type: 'questions',
		title: 'Câu hỏi'
	},
	{
		component: <TopicAdmin/>,
		type: 'topics',
		title: 'Chủ đề'
	},
	{
		component: <UserPage/>,
		type: 'users',
		title: 'User'
	},

];

const AdminPage = () => {
    document.title = "ADMIN | QL hệ thống";
	const menu = [
		{
            id: 1,
            name: "Quản lý user",
            path : '/admin/users',
			type: 'users',
        },
        {
            id: 2,
            name: "Quản lý topic",
            path : '/admin/topics',
			type: 'topics',
        },
        {
            id: 3,
            name: "Quản lý câu hỏi",
            path : '/admin/questions',
			type: 'questions',
        },
        {
            id: 4,
            name: "Quản lý công ty",
            path : '/admin/companies',
			type: 'companies',
        }
    ];
	const [title, setTiltle] = useState('User');
	const params = useParams();
    

	const genChildren = (type) => {
        if(!type) {
			type = 'users'
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
                                <h3 className="mb-4">Quản lý hệ thống</h3>
                                <div className="page-next">
                                    <nav className="d-inline-block" aria-label="breadcrumb text-center">
                                        <ol className="breadcrumb justify-content-center">
                                            <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                                            <li className="breadcrumb-item"><Link to="#">{genChildren(params.type)?.title || ''}</Link></li>
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

export default AdminPage;
