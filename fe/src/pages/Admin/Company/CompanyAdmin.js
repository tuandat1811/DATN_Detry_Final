import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { Link, useSearchParams } from "react-router-dom";
import { DEFAULT_IMG, DEFAULT_USER, EMPTY_IMG, URL_IMG, customDate, onErrorImg, onErrorUser } from "../../../services/common";
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




const CompanyAdmin = () =>
{
	document.title = "Admin | Ql - Công ty";

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
		const response = await CompanyService.getDataList( params );
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
	}, [] )

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
							<th className="text-nowrap">Avatar</th>
							<th className="text-nowrap">Tên công ty</th>
							<th className="text-nowrap">Email</th>
							<th className="text-nowrap">Số điện thoại</th>
							<th className="text-nowrap">Status</th>
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
										<td className="d-flex align-items-center">
											<img width="70" height="70"
												style={ { border: "0.5px solid gray", borderRadius: '5px' } }
												src={ URL_IMG + item.avatar || DEFAULT_IMG } alt={ item.name } onError={ onErrorImg } />
										</td>
										<td className="text-gray-900 text-nowrap">
											{ item.name }
										</td>
										<td className="text-gray-900 text-nowrap">
											{ item.email }
										</td>

										<td className="text-gray-900 text-nowrap">
											{item.phone}
										</td>
										<td className="text-gray-900 text-nowrap">{ genStatusClass( item.status ) }</td>
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
				<CompanyForm
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

export default CompanyAdmin;
