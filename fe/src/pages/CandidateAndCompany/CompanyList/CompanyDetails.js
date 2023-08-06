import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";

//Import Job Images
import jobImage1 from "../../../assets/images/featured-job/img-01.png";
import jobImage2 from "../../../assets/images/featured-job/img-02.png";
import jobImage3 from "../../../assets/images/featured-job/img-03.png";
import jobImage5 from "../../../assets/images/featured-job/img-05.png";
import jobImage6 from "../../../assets/images/featured-job/img-06.png";
import jobImage7 from "../../../assets/images/featured-job/img-07.png";
import jobImage8 from "../../../assets/images/featured-job/img-08.png";
import jobImage9 from "../../../assets/images/featured-job/img-09.png";
import jobImage10 from "../../../assets/images/featured-job/img-10.png";
import { DEFAULT_IMG, onErrorImg } from "../../../services/common";
import PaginationPage from "../../Jobs/JobList2/Pagination";

const CompanyDetails = ( props ) =>
{

	return (
		<React.Fragment>
			<Row className="align-items-center mb-4">
				<Col md={ 8 }>
					<div className="mb-3 mb-lg-0">
						<h6 className="fs-16 mb-0"> Showing {
							props.paging.total > props.paging?.page_size && props.paging?.page_size || props.paging.total }
							of { props.paging.total } results </h6>
					</div>
				</Col>
			</Row>

			<Row>
				{ props.companies.map( ( companyDetailsNew, key ) => (
					<Col md={ 4 } key={ key }>
						<Card className="text-center mb-4">
							<CardBody className="px-4 py-5">
								{/* { companyDetailsNew.label && (
									<div className="featured-label">
										<span className="featured">
											{ companyDetailsNew.labelRating }{ " " }
											<i className="mdi mdi-star-outline"></i>
										</span>
									</div>
								) } */}
								<img
									src={ companyDetailsNew.avatar || DEFAULT_IMG }
									alt=""
									onError={ onErrorImg }
									className="img-fluid rounded-3"
								/>
								<div className="mt-4">
									<Link to={ '/topic-company/' + companyDetailsNew.id } className="primary-link">
										<h6 className="fs-18 mb-2">
											{ companyDetailsNew.name }
										</h6>
									</Link>
									<p className="text-muted mb-0">
										{ companyDetailsNew.phone }
									</p>
									<p className="text-muted mb-4">
										{ companyDetailsNew.email }
									</p>
									<Link to={ '/topic-company/' + companyDetailsNew.id } className="btn btn-primary">
										{ companyDetailsNew.total_topic } Chủ đề
									</Link>
								</div>
							</CardBody>
						</Card>
					</Col>
				) ) }
			</Row>
			<PaginationPage
				data={ props.companies }
				paging={ props.paging }
				setPaging={props.setPaging}
				getDataList={props.getCompanies}
				params={props.params}
			/>
		</React.Fragment>
	);
};

export default CompanyDetails;
