import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { toggleShowLoading } from "../../redux/actions/common";
import { TopicService } from "../../services/topic";
import { useDispatch } from "react-redux";
import { QuestionService } from "../../services/question";
import { DEFAULT_IMG, checkIsAdmin, checkIsUser, checkLogin, customDate, onErrorImg } from "../../services/common";
import { AnswerResultForm } from "./answersForm";
import { message } from "antd";
import NoDataPage from "../../components/noData";

const QuestionDetail = () =>
{
	document.title = 'Câu hỏi'
	const dispatch = useDispatch();

	const params = useParams();
	let [ searchParams, setSearchParams ] = useSearchParams( {} );
	const [ topics, setTopics ] = useState( null );
	const [ paging, setPaging ] = useState( { page: 1, page_size: 10, total: 0 } );
	const [ questions, setQuestions ] = useState( [] );
	const [ showModal, setShowModal ] = useState( false );

	const [ modal, setModal ] = useState( {
		title: 'Feedback',
		type: 'question',
		content: '',
		question_id: 0
	} );



	const getTopics = async ( id ) =>
	{
		const response = await TopicService.getDetailData( id );
		if ( response?.status === 'success' )
		{
			setTopics( response.data );
		} else
		{
			setTopics( null );
		}
	}

	const getQuestions = async ( params ) =>
	{
		dispatch( toggleShowLoading( true ) );
		setSearchParams( params );
		let response;
		if ( checkLogin() )
		{
			response = await QuestionService.getDataListByDefaultUser( params );
		} else
		{
			response = await QuestionService.getDataList( params );
		}
		if ( response?.status === 'success' )
		{
			setQuestions( response.data.result );
			setPaging( response.data.meta )
		} else
		{
			setQuestions( [] );
		}
		dispatch( toggleShowLoading( false ) );
	}

	useEffect( () =>
	{
		// getDetailData();
		if ( params.topic_id )
		{
			getTopics( params.topic_id ).then( rs => { } );
			getQuestions( { ...paging, topic_id: params.topic_id } )
		}
	}, [ params.topic_id ] );

	const handleAnswer = async ( item ) =>
	{
		if ( !checkLogin() )
		{
			message.error( 'Vui lòng đăng nhập để có thể trả lời câu hỏi!' );
			return;
		} else
		{
			setShowModal( true );
			let data = { ...modal, content: item.content_question, question_id: item.id };
			setModal( data );
		}
	}

	return (
		<React.Fragment>
			<section className="page-title-box">
				<Container>
					<Row className="justify-content-center">
						<Col md={ 6 }>
							<div className="text-center text-white">
								<div className="page-next">
									<nav
										className="d-inline-block"
										aria-label="breadcrumb text-center"
									>
										<ol className="breadcrumb justify-content-center">
											<li className="breadcrumb-item">
												<Link to="/">Home</Link>
											</li>
											<li className="breadcrumb-item">
												<Link to={ "/topics" }>Chủ đề</Link>

											</li>
											<li
												className="breadcrumb-item active"
												aria-current="page"
											>
												{ " " }
												Câu hỏi { " " }
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
						{
							questions?.length > 0 &&
							questions.map( ( item, key ) =>
							{
								return <Col md={ 12 }>
									<Card className="blog-grid-box">
										<CardBody>
											<ul className="list-inline d-flex mt-0 justify-content-between mb-3">
												<li className="list-inline-item">
													<p className="text-muted mb-0">
														{ item.user?.name } { " - " } { customDate( item.created_at, 'DD/MM/yyyy hh:mm' ) }
													</p>
												</li>
												<li className="list-inline-item">
													<p className="text-muted mb-0">
														<i className="mdi mdi-eye"></i>{ " " }
														{ item.count_answer || 0 }
													</p>
												</li>
											</ul>
											<h5 className="fs-19">{ item.name }</h5>
											<div style={{maxWidth: '300px', maxHeight: '300px'}} className="mx-auto  text-center my-3">
												<img style={{objectFit: 'cover'}} className="h-100" src={ item.avatar || DEFAULT_IMG } alt={ item.id } onError={ onErrorImg } />

											</div>
											<p>
												{ item.content_question }
											</p>
											{

												<div className="border-top-muted pt-4">
													{
														item.answers ?
															<>
																<div className="pt-4">
																	<h4 className="fs-17">
																		FeedBack của bạn:
																	</h4>
																	<p>
																		{ item.answers.content_answer }
																	</p>
																</div>
															</>
															: <Link to="#" className="form-text text-primary"
																onClick={ () =>
																{
																	handleAnswer( item )
																} }>
																{ item.answer ? 'Xem feedback' : 'Feedback' }  <i className="uil uil-angle-right-b"></i>
															</Link>
													}

												</div>
											}
										</CardBody>
									</Card>
								</Col>
							} )
						}

					</Row>
					<NoDataPage total={ paging.total || 0 } />
				</Container>
			</section>
			<AnswerResultForm
				showModal={ showModal }
				setShowModal={ setShowModal }
				modal={ modal }
				getDataList={ getQuestions }
				setModal={ setModal }
			/>
		</React.Fragment>
	);
};

export default QuestionDetail;
