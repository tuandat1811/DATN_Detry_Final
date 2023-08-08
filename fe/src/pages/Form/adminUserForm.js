import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { message, Form, Input, Upload } from "antd";
import { useDispatch } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import { toggleShowLoading } from "../../redux/actions/common";
import { UserService } from "../../services/user";
import { appendForm, uploadFileAvatar } from "../../services/common/helpersFnc";
import { CompanyService } from "../../services/company";
import { uploadFile } from "../../services/apiService";
import { normFile, onFieldsChange, resetForm, timeDelay, validateMessages } from "../../services/common";
import Select from "react-select";

export const UserForm = ( props ) =>
{



	const [ form ] = useForm();


	const dispatch = useDispatch();

	const [ files, setFiles ] = useState( [] );
	const [ companyConfigs, setCompanyConfigs ] = useState( [] );
	const [ mes, setMes ] = useState( '' );
	const [ data, setData ] = useState( null );
	const [ formStatus, setFormStatus ] = useState( {
		value: 'ACTIVE', label: 'ACTIVE'
	} )
	const [ formCompany, setFormCompany ] = useState( null )
	const [ formType, setFormType ] = useState( {
		value: 'DEFAULT', label: 'USER'
	} )


	useEffect( () =>
	{
		getCompanies()
	}, [] );


	useEffect( () =>
	{
		if ( props.id )
		{
			getDetail( props.id )
		} else
		{
			setData( null )
		}
	}, [ props.id ] );

	const getDetail = async ( id ) =>
	{
		dispatch( toggleShowLoading( true ) )
		const rs = await UserService.getDetailData( id );
		dispatch( toggleShowLoading( false ) )

		if ( rs.status === 'success' )
		{
			let data = rs.data;
			setData( data )
			if ( data )
			{
				appendForm( {
					avatar: data?.avatar,
					status: data?.status,
					phone: data?.phone,
					type: data?.type,
					company_id: data?.company_id,
					name: data?.name,
					email: data?.email
				}, form, setFiles, true )
				const status = statusConfig.find( item => item.value === data.status );
				setFormStatus( status )
				const type = roleConfig.find( item => item.value === data.type );

				setFormType( {
					value: type?.value,
					label: type?.label
				} )
				if ( companyConfigs?.length > 0 )
				{
					const company = companyConfigs.filter( item => item.value == data.company_id);
					if(company) {
					setFormCompany( company[0] )

					}
				}


			}
		}
	}


	const getCompanies = async () =>
	{
		const response = await CompanyService.getDataList(
			{ page: 1, page_size: 1000, status: 'ACTIVE' } );
		if ( response.status === 'success' && response.data.result.length > 0 )
		{
			let companies = response.data.result.reduce( ( arr, e ) =>
			{
				arr.push( {
					value: e.id,
					label: e.name
				} )
				return arr;
			}, [] );
			setFormCompany( companies[ 0 ] )
			setCompanyConfigs( companies );
		}
	}

	const submitForm = async ( e ) =>
	{

		dispatch( toggleShowLoading( true ) )
		let avatar = await uploadFileAvatar( files );

		let formData = { ...e };
		let res;

		delete formData.image;
		if ( avatar )
		{
			formData.avatar = avatar;
		}
		if ( formData.company_id && formData.company_id.value )
			formData.company_id = formData.company_id.value;

		if ( formData.status && formData.status.value )
			formData.status = formData.status.value;

		if ( formData.type && formData.type.value )
			formData.type = formData.type.value;

		if ( props.id )
		{
			res = await UserService.putData( props.id, formData );
		} else
		{
			res = await UserService.createData( formData );
		}
		await timeDelay( 1000 )
		dispatch( toggleShowLoading( false ) )
		if ( res.status === 'success' )
		{

			resetFormData()
			message.success( 'Successfully' )
			props.getDataList( { ...props.paging, ...props.params, page: 1 } );
		} else if ( res?.status === 'fail' && res.data )
		{
			let errorArr = Object.entries( res.data );
			if ( errorArr.length > 0 )
			{
				let error = errorArr[0];
				setMes(error[1][0])
			}
		} else
		{
			setMes( res.message );
			message.error( res.message )
		}
	}

	const statusConfig = [
		{ value: 'ACTIVE', label: 'ACTIVE' },
		{ value: 'INACTIVE', label: 'INACTIVE' }
	];

	const roleConfig = [
		{
			value: 'ADMIN',
			label: 'Admin'
		},
		{
			value: 'USER',
			label: 'User vip'
		},
		{
			value: 'DEFAULT',
			label: 'User'
		},
	];
	const resetFormData = () =>
	{
		resetForm( form )
		props.setShowModal( false );
		setFiles( [] )
		setMes( '' )
		setData( null )
		props.setId( null )
		setFormStatus({
			value: 'ACTIVE', label: 'ACTIVE'
		})
		setFormCompany(companyConfigs[0])
		setFormType({
			value: 'DEFAULT', label: 'User'
		})
	}


	return (
		<Modal show={ props.showModal } size="lg" dialogClassName="dialog-style">
			<Modal.Header style={ { justifyContent: 'center' } }>
				<div className="fs-21">{ props.id ? 'Cập nhật user' : 'Tạo mới user' }</div>
			</Modal.Header>
			<Modal.Body>
				<span className="text-danger">{ mes }</span>

				<Form
					className='p-3'
					name='nest-messages form'
					form={ form }
					onFinish={ submitForm }
					onFieldsChange={ e => onFieldsChange( e, form ) }
					validateMessages={ e => validateMessages( e, form ) }
				>
					<div className='row'>
						<div className="col-md-6">
							<Form.Item name="name" label="Họ và tên"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Input placeholder='Nhập họ và tên' />
							</Form.Item>
						</div>

						<div className="col-md-6">
							<Form.Item name="email" label="Email"
								rules={ [ { required: true } ] }

								className=' d-block'>
								<Input readOnly={ props.id ? true : false } placeholder='Nhập email' />
							</Form.Item>
						</div>

						{
							!props.id &&
							<>
								<div className="col-md-6">
									<Form.Item name="username" label="Tên đăng nhập"
										rules={ [ { required: true } ] }
										className=' d-block'>
										<Input placeholder='Nhập tên đăng nhập' />
									</Form.Item>
								</div>
								<div className="col-md-6">
									<Form.Item name="password" label="Mật khẩu"
										rules={ [ { required: true } ] }
										className=' d-block'>
										<Input.Password placeholder='Nhập mật khẩu' />
									</Form.Item>
								</div>
							</>

						}

						<div className="col-md-6">
							<Form.Item name="phone" label="Số điện thoại"
								// rules={ [ { required: true, type: { number: true } } ] }
								className=' d-block'>
								<Input type="number" placeholder='Nhập số điện thoại' />
							</Form.Item>
						</div>

						<div className="col-md-3">
							<Form.Item
								label="Avatar"
								name="image"
								accept="images/**"
								className='d-block'
								valuePropName="fileList"
								fileList={ files }
								getValueFromEvent={ ( e ) => normFile( e, setFiles ) }
							>
								<Upload action="/upload" listType="picture-card">
									{ files.length <= 0 && <div>
										<div style={ { marginTop: 8 } }>Chọn ảnh</div>
									</div> }
								</Upload>
							</Form.Item>
						</div>
						<div className="col-md-6">
							<Form.Item name="type" label="User type"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Select
									defaultValue={ formType }
									placeholder="Chọn user type"
									style={ { width: '100%' } }
									options={ roleConfig }
								/>
							</Form.Item>
						</div>
						<div className="col-md-6">
							<Form.Item name="status" label="Trạng thái"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Select
									placeholder="Chọn trạng thái"
									style={ { width: '100%' } }
									defaultValue={ formStatus }
									options={ statusConfig }
								/>
							</Form.Item>
						</div>

						<div className="col-md-12">
							<Form.Item name="company_id" label="Công ty"
								// rules={ [ { required: true } ] }
								className=' d-block'>
								<Select
									placeholder="Chọn công ty"
									// defaultInputValue={ formCompany}
									// showSearch
									// filterOption={ ( input, option ) =>
									// 	( option?.label?.toLowerCase() ).includes( input?.toLowerCase() ) }
									style={ { width: '100%' } }
									options={ companyConfigs }
								/>
							</Form.Item>
						</div>

					</div>
					<div className='d-flex justify-content-center'>
						<button type="submit"
							className="btn btn-primary text-center"
							style={ { marginRight: 10, padding: '10px 10px' } }>
							{ props.id ? 'Cập nhật' : 'Tạo mới' }
						</button>
						<button
							type="button"
							className="btn btn-secondary text-center"
							style={ { marginRight: 10, padding: '10px 10px' } }
							onClick={ () =>
							{
								resetFormData()
							} }>
							Hủy bỏ
						</button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
