import React, { useState } from "react";
import
{
	Container,
	Row,
	Col,
	Nav,
	NavItem,
	NavLink,
	TabContent,
	TabPane
} from "reactstrap";
import classnames from "classnames";

//Components Imports
import FeaturedJobs from "../JobList/FeaturedJobs";
import Freelancer from "../JobList/Freelancer.js";
import Fulltime from "../JobList/Fulltime.js";
import Parttime from "../JobList/Parttime.js";
import RecentJobs from "./RecentJobs";
import { Link } from "react-router-dom";
import { DEFAULT_IMG, URL_IMG, onErrorImg } from "../../../services/common";
import NoDataPage from "../../../components/noData";

const JobList = ( props ) =>
{
	const [ activeTab, setActiveTab ] = useState( "1" );

	const tabChange = ( tab ) =>
	{
		if ( activeTab !== tab ) setActiveTab( tab );
	};
	return (
		<React.Fragment>
			<div className="section bg-light">
				<Container>
					<Row className="justify-content-center">
						<Col md={ 6 }>
							<div className="section-title text-center mb-4 pb-2">
								<h4 className="title">Các chủ đề ngẫu nhiên</h4>
								<p className="text-muted mb-1">Các chủ đề , topic ngẫu nhiên dành cho bạn</p>
							</div>
						</Col>
					</Row>
					<Row>
						{
							props.topics?.length > 0 &&
							props.topics.map( ( topic, key ) => 
							{
								return <Col md={ 6 }>
									<div
										className="job-box card mt-4"
										key={ key }
									>
										<div className="p-4">
											<Row>
												<Col md={ 2 }>
													<Link to={ "/topic-question/" + topic.id }>
														<img
															src={ URL_IMG + topic.avatar || DEFAULT_IMG }
															alt=""
															onError={ onErrorImg }
															className="img-fluid rounded-3"
														/>
													</Link>
												</Col>
												<Col md={ 10 }>
													<div className="mt-3 mt-lg-0">
														<h5 className="fs-17 mb-1">
															<Link to={ "/topic-question/" + topic.id } className="text-dark">
																{ topic.name }
															</Link>
															{
																topic?.total_question ?
																	<small className="text-muted ms-2 fw-normal">
																		({ topic.total_question } Câu hỏi)
																	</small>
																	: ''
															}

														</h5>
														<ul className="list-inline mb-0">
															<li className="list-inline-item">
																<p className="text-muted fs-14 mb-0">
																	{ topic.company?.name }
																</p>
															</li>
														</ul>
													</div>
												</Col>
											</Row>
										</div>
									</div>
								</Col>
							}
							)
						}
						
					</Row>
					<Row>
						<Col md={ 12 }>
							<div className="mt-5 text-center">
								<Link
									to="/topics"
									className="btn btn-primary btn-hover"
								>
									Xem tất cả <i className="uil uil-arrow-right"></i>
								</Link>
							</div>
						</Col>
					</Row>

				</Container>
			</div>
		</React.Fragment>
	);
};
export default JobList;
