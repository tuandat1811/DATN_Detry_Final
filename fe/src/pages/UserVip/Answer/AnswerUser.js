import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { Link, useSearchParams } from "react-router-dom";
import { DEFAULT_USER, EMPTY_IMG, customDate, onErrorUser } from "../../../services/common";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "../../../redux/actions/common";
import { UserService } from "../../../services/user";
import { genStatusClass, genUserType } from "../../../services/common/helpersFnc";
import PaginationPage from "../../Jobs/JobList2/Pagination";
import { UserForm } from "../../Form/adminUserForm";
import {
	EditOutlined
  } from '@ant-design/icons';
import { CompanyForm } from "../../Form/companyForm";
import { CompanyService } from "../../../services/company";
import { QuestionForm } from "../../Form/questionForm";
import { QuestionService } from "../../../services/question";
import { TopicForm } from "../../Form/topicForm";
import { TopicService } from "../../../services/topic";




const AnswerUser = () =>
{
	document.title = "User | Ql - Câu trả lời";

	const [ dataList, setDataList ] = useState( [] );

	let [ searchParams, setSearchParams ] = useSearchParams( {} );

	const [ paging, setPaging ] = useState( { page: 1, page_size: 6, total: 0 } );
	const [ params, setParams ] = useState( {} );
	const [ showModal, setShowModal ] = useState( false );
	const [ id, setId ] = useState( false );
	const dispatch = useDispatch();

	const getDataList = async ( params ) =>
	{
		if ( params )
		{
			delete params.total;
			delete params.total_page;
		}
		setSearchParams( params );
		dispatch( toggleShowLoading( true ) );
		const response = await TopicService.getDataList( params );
		dispatch( toggleShowLoading( false ) );
		if ( response?.status === 'success' )
		{
			setDataList( response.data.result );
			setPaging( response.data.meta );
		} else
		{
			setDataList( [] );
			setPaging( { page: 1, page_size: 6, total: 0 } )
		}
	}

	useEffect( () =>
	{
		getDataList( { page: 1, page_size: paging.page_size } );
	}, [] )

	return (

		<div className="blog-post">
			<div className="pt-3">
				<Table className={ `table table-bordered table-striped mb-0` } responsive>
					<thead>
						<tr>
							<th>ID</th>
							<th className="text-nowrap">Chủ đề</th>
							<th className="text-nowrap">Câu hỏi</th>
							<th className="text-nowrap">Thí sinh</th>
							<th className="text-nowrap">Điểm số</th>
							<th className="text-nowrap">Thời gian</th>
							<th className="text-nowrap">Action</th>
						</tr>
					</thead>
					<tbody>
						{
							dataList?.length > 0 && dataList.map( ( item, key ) =>
							{
								return (
									< tr key={ key } className="table-product">
										<td className="text-gray-900 text-center">{ ( paging.page - 1 ) * paging.page_size + ( key + 1 ) }</td>
										
										<td className="text-gray-900 text-nowrap">
											{ item.name }
										</td>
										<td className="text-gray-900 text-break" style={{minWidth: '200px'}}>
											{ item.company?.name || 'N/A' }
										</td>

										<td className="text-gray-900 text-break">
											{item.user?.name || 'N/A'}
										</td>
										<td>
											<div className="d-flex">
												<Link to="#" className="d-flex justify-content-center"
													onClick={ () =>
													{
														setShowModal( true )
														setId( item.id )
													} }>
													Edit
												</Link>
											</div>

										</td>
									</tr>
								)
							}
							) }

						{
							( paging.total <= 0 ) &&
							<tr>
								<td colSpan={ 8 } style={ { textAlign: "center", backgroundColor: '#ffff' } }>
									<img className="text-center" src={ EMPTY_IMG } style={ { width: "300px", height: "300px" } } />
									<div style={ { color: "#9A9A9A" } }>Không có dữ liệu</div>
								</td>
							</tr>
						}


					</tbody>
				</Table>

				<PaginationPage
					data={ dataList }
					paging={ paging }
					setPaging={ setPaging }
					getDataList={ getDataList }
					params={ params }
				/>
				<TopicForm
					getDataList={ getDataList }
					paging={ paging }
					params={ params }
					setShowModal={ setShowModal }
					id={ id }
					setId={ setId }
					showModal={ showModal }
				/>
			</div>
		</div>
	);
};

export default AnswerUser;
