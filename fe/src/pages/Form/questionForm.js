import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { message, Form, Input, Select, Upload } from "antd";
import { useDispatch } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import { toggleShowLoading } from "../../redux/actions/common";
import { UserService } from "../../services/user";
import { appendForm, uploadFileAvatar } from "../../services/common/helpersFnc";
import { CompanyService } from "../../services/company";
import { uploadFile } from "../../services/apiService";
import { normFile, onFieldsChange, resetForm, timeDelay, validateMessages } from "../../services/common";
import { TopicService } from "../../services/topic";
import { QuestionService } from "../../services/question";

export const QuestionForm = ( props ) =>
{



	const [ form ] = useForm();
	const [ file, setFile ] = useState( [] );

	const dispatch = useDispatch();


	const [ dataConfigs, setDataConfigs ] = useState( [] );
	const [ mes, setMes ] = useState( '' );

	useEffect( () =>
	{
		getList()
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
		const rs = await UserService.getDetailData( id );
		dispatch( toggleShowLoading( false ) )

		if ( rs.status === 'success' )
		{
			let data = rs.data;
			if ( data )
			{
				appendForm( {
					status: data?.status,
					content_question: data?.content_question,
					topic_id: data?.topic_id,
				}, form, setFile )
			}
		}
	}

	const getList = async () =>
	{
		let response;
		if ( props.type === 'user' )
		{

			response = await TopicService.getDataList(
				{ page: 1, page_size: 1000, status: 'ACTIVE' } );
		} else
		{
			response = await TopicService.getDataList(
				{ page: 1, page_size: 1000, status: 'ACTIVE' } );
		}
		if ( response.status === 'success' && response.data.result.length > 0 )
		{
			console.log( response.data.result );
			let companies = response.data.result.reduce( ( arr, e ) =>
			{
				arr.push( {
					value: e.id,
					label: e.name
				} )
				return arr;
			}, [] );
			console.log( companies );
			setDataConfigs( companies );
		}
	}

	const submitForm = async ( e ) =>
	{

		dispatch( toggleShowLoading( true ) )

		let formData = { ...e };
		let res;

		if ( props.id )
		{
			delete formData.email;
			res = await QuestionService.putData( props.id, formData );
		} else
		{
			res = await QuestionService.createData( formData );
		}
		await timeDelay( 1000 )
		dispatch( toggleShowLoading( false ) )
		if ( res.status === 'success' )
		{
			props.setShowModal( false );
			setMes( '' )
			resetForm( form )
			message.success( 'Successfully' )
			props.getDataList( { ...props.paging, ...props.params, page: 1 } );
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
		setMes( '' )
		props.setId( null )
	}

	return (
		<Modal show={ props.showModal } size="lg" dialogClassName="dialog-style">
			<Modal.Header style={ { justifyContent: 'center' } }>
				<div className="fs-21">{ props.id ? 'Cập nhật câu hỏi' : 'Tạo mới câu hỏi' }</div>
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
							<Form.Item name="content_question" label="Câu hỏi"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Input.TextArea rows={ 5 } className="w-100" placeholder='Nhập câu hỏi' />
							</Form.Item>
						</div>

						<div className="col-md-12">
							<Form.Item name="topic_id" label="Chủ đề"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Select
									placeholder="Chọn chủ đề"
									style={ { width: '100%' } }
									options={ dataConfigs }
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
