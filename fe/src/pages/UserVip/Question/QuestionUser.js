import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { Link, useSearchParams } from "react-router-dom";
import { DEFAULT_USER, EMPTY_IMG, customDate, onErrorUser, timeDelay } from "../../../services/common";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "../../../redux/actions/common";
import { UserService } from "../../../services/user";
import { genStatusClass, genUserType } from "../../../services/common/helpersFnc";
import PaginationPage from "../../Jobs/JobList2/Pagination";
import { UserForm } from "../../Form/adminUserForm";
import
	{
		EditOutlined
	} from '@ant-design/icons';
import { CompanyForm } from "../../Form/companyForm";
import { CompanyService } from "../../../services/company";
import { QuestionForm } from "../../Form/questionForm";
import { QuestionService } from "../../../services/question";
import { DeleteConfirm } from "../../Form/deleteConfirm";
import { message } from "antd";




const QuestionUser = () =>
{
	document.title = "User | Ql - Câu hỏi";

	const [ dataList, setDataList ] = useState( [] );

	let [ searchParams, setSearchParams ] = useSearchParams( {} );

	const [ paging, setPaging ] = useState( { page: 1, page_size: 10, total: 0 } );
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
		const response = await QuestionService.getDataListBySupperUser( params );
		dispatch( toggleShowLoading( false ) );
		if ( response?.status === 'success' )
		{
			setDataList( response.data.result );
			setPaging( response.data.meta );
		} else
		{
			setDataList( [] );
			setPaging( { page: 1, page_size: 10, total: 0 } )
		}
	}

	useEffect( () =>
	{
		getDataList( { page: 1, page_size: paging.page_size } );
	}, [] );

	const deleteData = async (id) => {
		dispatch(toggleShowLoading(true))
		const response = await QuestionService.deleteData(id);
		await timeDelay(1000);
		dispatch(toggleShowLoading(false))
		if(response?.status == 'success') {
			message.success('Xóa câu hỏi thành công');
			getDataList({page: 1, page_size:10});
		} else {
			message.success('Có lỗi sảy ra khi xóa câu hỏi');
		}
	}

	const [showModalDelete, setShowModalDelete] = useState(false);

	return (

		<div className="blog-post">
			<Link to="#" className="btn btn-sm btn-success fw-medium"
				onClick={ () =>
				{
					setShowModal( true )
				} }>
				<i className="uil uil-plus-circle"></i> Thêm mới
			</Link>{ " " }
			<div className="pt-3">
				<Table className={ `table table-bordered table-striped mb-0` } responsive>
					<thead>
						<tr>
							<th>ID</th>
							<th className="text-nowrap">Tiêu đề</th>
							<th className="text-nowrap">Nội dung</th>
							<th className="text-nowrap">Tên chủ đề</th>
							<th className="text-nowrap">Người tạo</th>
							<th className="text-nowrap">Số lượng câu trả lời</th>
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
										<td className="text-gray-900 text-break" style={ { minWidth: '200px' } }>
											{ item.content_question }
										</td>

										<td className="text-gray-900 text-break">
											{ item.topic?.name || 'N/A' }
										</td>
										<td className="text-gray-900 text-break">
											{ item.user?.name || 'N/A' }
										</td>
										<td className="text-gray-900 text-break">
											{ item.count_answer || '0' }
										</td>
										<td>
											<div className="d-flex">
												<Link to="#" className="btn btn-info text-nowrap"
													onClick={ () =>
													{
														setShowModal( true )
														setId( item.id )
													} }>
													Chỉnh sửa
												</Link>
												<Link to="#" className="btn btn-danger ms-2"
													onClick={ () =>
													{
														setShowModalDelete( true )
														setId( item.id )
													} }>
													Xóa
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
				<QuestionForm
					getDataList={ getDataList }
					paging={ paging }
					params={ params }
					setShowModal={ setShowModal }
					id={ id }
					type={ 'user' }
					setId={ setId }
					showModal={ showModal }
				/>

				<DeleteConfirm
					deleteData={ deleteData }
					id={ id }
					setId={ setId }
					showModal={ showModalDelete }
					setShowModal={ setShowModalDelete }
					title={ 'câu hỏi' }
				/>
			</div>
		</div>
	);
};

export default QuestionUser;
