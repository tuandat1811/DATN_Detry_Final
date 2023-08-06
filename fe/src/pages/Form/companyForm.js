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

export const CompanyForm = ( props ) =>
{



	const [ form ] = useForm();


	const dispatch = useDispatch();

	const [ files, setFiles ] = useState( [] );
	const [ logos, setLogos ] = useState( [] );
	const [ mes, setMes ] = useState( '' );
	const [ statusForm, setStatusForm ] = useState( 'ACTIVE' );

	useEffect( () =>
	{
		if ( props.id )
		{
			getDetail( props.id )
		}
	}, [ props.id ] );

	const getDetail = async ( id ) =>
	{
		dispatch( toggleShowLoading( true ) )
		const rs = await CompanyService.getDetailData( id );
		dispatch( toggleShowLoading( false ) )

		if ( rs.status === 'success' )
		{
			let data = rs.data;
			if ( data )
			{
				appendForm( {
					avatar: data?.avatar,
					phone: data?.phone,
					email: data?.email,
					name: data?.name,
					status: data?.status
				}, form, setFiles, true )
				console.log( '----------- data?.status: ', data?.status );
				setStatusForm( data?.status );
			}
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
			formData.logo = avatar;
		}

		console.log( '------------- formData: ', formData );
		formData.status = formData.status.value;
		if ( props.id )
		{
			res = await CompanyService.putData( props.id, formData );
		} else
		{
			res = await CompanyService.createData( formData );
		}
		await timeDelay( 1000 )
		dispatch( toggleShowLoading( false ) )
		if ( res.status === 'success' )
		{
			props.setShowModal( false );
			setMes( '' )
			setFiles( [] )
			resetForm( form )
			message.success( 'Successfully' )
			props.getDataList( { ...props.paging, ...props.params, page: 1 } );
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


	const resetFormData = () =>
	{
		resetForm( form )
		props.setShowModal( false );
		setFiles( [] )
		setMes( '' )
		props.setId( null )
	}

	return (
		<Modal show={ props.showModal } size="lg" dialogClassName="dialog-style">
			<Modal.Header style={ { justifyContent: 'center' } }>
				<div className="fs-21">{ props.id ? 'Cập nhật công ty' : 'Tạo mới công ty' }</div>
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
							<Form.Item name="name" label="Tên công ty"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Input placeholder='Nhập tên công ty' />
							</Form.Item>
						</div>

						<div className="col-md-6">
							<Form.Item name="email" label="Email"
								rules={ [ { required: true } ] }

								className=' d-block'>
								<Input readOnly={ props.id ? true : false } placeholder='Nhập email' />
							</Form.Item>
						</div>



						<div className="col-md-6">
							<Form.Item name="phone" label="Số điện thoại"
								rules={ [ { required: true, type: { number: true } } ] }
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

						<div className="col-md-12">
							<Form.Item name="status" label="Trạng thái"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Select
									placeholder="Chọn trạng thái"

									style={ { width: '100%' } }
									value={ statusForm }
									options={ statusConfig }
									onChange={ setStatusForm }
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
