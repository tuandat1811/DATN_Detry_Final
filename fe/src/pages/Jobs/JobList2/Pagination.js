import { Pagination } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

const PaginationPage = ( props ) =>
{
	return (
		<>
			{
				props.data && props.paging.total > 0 &&
				<div className="mx-auto d-flex justify-content-center my-4">
					<Pagination
						onChange={ e =>
							props.getDataList( { ...props.paging, page: e, ...props.params } )
						}
						pageSize={ props.paging.page_size }
						defaultCurrent={ props.paging.page }
						total={ props.paging.total }
					/>
				</div>
			}
		</>
	);
};

export default PaginationPage;
