import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import JobVacancy from "../Jobs/JobGrid/JobVacancy";
import PaginationPage from "../Jobs/JobList2/Pagination";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CompanyService } from "../../services/company";
import { TopicService } from "../../services/topic";
import { toggleShowLoading } from "../../redux/actions/common";
import { DEFAULT_IMG, onErrorImg } from "../../services/common";



const TopicCompany = () =>
{
	document.title = 'Chủ đề'

	//Apply Now Model
	const [ modal, setModal ] = useState( false );
	const openModal = () => setModal( !modal );
	const dispatch = useDispatch();

	const params = useParams();

	let [ searchParams, setSearchParams ] = useSearchParams( {} );

	const [ topics, setTopics ] = useState( [] );

	const [ paging, setPaging ] = useState( { page: 1, page_size: 6, total: 0 } );
	const [ paramsTopic, setParamsTopic ] = useState( {} );


	const getTopics = async ( params ) =>
	{
		dispatch( toggleShowLoading( true ) )
		setSearchParams( params );
		const response = await TopicService.getDataList( params );
		if ( response?.status === 'success' )
		{
			setTopics( response.data.result );
			setPaging( response.data.meta );
		} else
		{
			setTopics( [] );
		}
		dispatch( toggleShowLoading( false ) )
	}

	useEffect( () =>
	{
		// getDetailData();
		if ( params.company_id )
		{
			setParamsTopic( { company_id: params.company_id } )
			getTopics( { ...paging, company_id: params.company_id } ).then( rs => { } );
		} else
		{
			getTopics( { ...paging } ).then( rs => { } );
		}
	}, [ params.company_id ] );


	return (
		<React.Fragment>
			<section className="page-title-box">
				<Container>
					<Row className="justify-content-center">
						<Col md={ 6 } className="col-md-6">
							<div className="text-center text-white">
							<h3 className="mb-4">Chủ đề</h3>
								<div className="page-next">
									<nav
										className="d-inline-block"
										aria-label="breadcrumb text-center"
									>
										<ol className="breadcrumb justify-content-center">
											<li className="breadcrumb-item">
												<Link to="/">Home</Link>
											</li>
											{ params?.company_id &&
												<li className="breadcrumb-item">
													<Link to="/companies">Công ty</Link>
												</li>
											}

											<li
												className="breadcrumb-item active"
												aria-current="page"
											>
												{ " " }
												Chủ đề { " " }
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
						{ topics.map( ( topic, key ) => (
							<Col md={ 6 } key={ key }>
								<div
									className="job-box card mt-4"
								>
									<div className="p-4">
										<Row>
											<Col md={ 2 }>
												<Link to={ "/topic-question/" + topic.id }>
													<img
														src={ topic.avatar || DEFAULT_IMG }
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
						) ) }
					</Row>
					<PaginationPage
						data={ topics }
						paging={ paging }
						setPaging={ setPaging }
						getDataList={ getTopics }
						params={ params }
					/>
				</Container>
			</section>
		</React.Fragment>
	);
};

export default TopicCompany;
