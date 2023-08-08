import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { message, Form, Input, Upload } from "antd";
import { useDispatch } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import { toggleShowLoading } from "../../redux/actions/common";
import { UserService } from "../../services/user";
import { appendForm, uploadFileAvatar } from "../../services/common/helpersFnc";
import { CompanyService } from "../../services/company";
import { URL_IMG, normFile, onFieldsChange, resetForm, timeDelay, validateMessages } from "../../services/common";
import { TopicService } from "../../services/topic";
import Select from "react-select";

export const TopicForm = ( props ) =>
{
	const [ form ] = useForm();

	const dispatch = useDispatch();

	const [ files, setFiles ] = useState( [] );
	const [ companyConfigs, setCompanyConfigs ] = useState( [] );
	const [ mes, setMes ] = useState( '' );

	useEffect( () =>
	{
		getCompanies()
	}, [] );


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
		const rs = await TopicService.getDetailData( id );
		dispatch( toggleShowLoading( false ) )

		if ( rs.status === 'success' )
		{
			let data = rs.data;
			if ( data )
			{
				appendForm( {
					avatar: data?.avatar,
					company_id: data?.company_id,
					name: data?.name,
				}, form, setFiles, true )
			}
		}
	}

	const getCompanies = async () =>
	{
		let response;
		if ( props.type === 'user' )
		{

			response = await CompanyService.getDataListByUser(
				{ page: 1, page_size: 1000, status: 'ACTIVE' } );
		} else
		{
			response = await CompanyService.getDataList(
				{ page: 1, page_size: 1000, status: 'ACTIVE' } );
		}
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
			console.log( companies );
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
		if (formData.company_id && formData.company_id.value)
			formData.company_id = formData.company_id.value;

		if ( props.id )
		{
			res = await TopicService.putData( props.id, formData );
		} else
		{
			res = await TopicService.createData( formData );
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
				<div className="fs-21">{ props.id ? 'Cập nhật topic' : 'Tạo mới topic' }</div>
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
						<div className="col-md-12">
							<Form.Item name="name" label="Tiêu đề"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Input placeholder='Nhập tiêu đề' />
							</Form.Item>
						</div>

						<div className="col-md-12">
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
						{
							companyConfigs.length > 0 &&
							<div className="col-md-12">
								<Form.Item name="company_id" label="Công ty"
									rules={ [ { required: true } ] }
									className=' d-block'>
									<Select
										placeholder="Chọn công ty"
										// showSearch
										// filterOption={ ( input, option ) =>
										// 	( option?.label?.toLowerCase() ).includes( input?.toLowerCase() ) }
										style={ { width: '100%' } }
										options={ companyConfigs }
									/>
								</Form.Item>
							</div>
						}


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
