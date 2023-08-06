import React, { useEffect, useState } from "react";
import { Modal, Row } from "react-bootstrap";
import { message, Form, Input, Select, Upload } from "antd";
import { useDispatch } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import { toggleShowLoading } from "../../redux/actions/common";
import { UserService } from "../../services/user";
import { appendForm, uploadFileAvatar } from "../../services/common/helpersFnc";
import { CompanyService } from "../../services/company";
import { URL_IMG, normFile, onFieldsChange, resetForm, timeDelay, validateMessages } from "../../services/common";
import { TopicService } from "../../services/topic";
import { AnswerService } from "../../services/answer";
import { ResultService } from "../../services/result";

export const AnswerResultForm = ( props ) =>
{
	const [ form ] = useForm();
	const [ files, setFiles ] = useState( [] );
	const id = props?.data?.result_id || null;
	const dispatch = useDispatch();

	const [ mes, setMes ] = useState( '' );


	useEffect( () =>
	{
		if ( id )
		{
			appendForm( {
				content_result: props.data?.content_result || null,
				point: props?.data.point || null
			}, form, setFiles )
		}
	}, [ id ] );

	// const getDetail = async ( id ) =>
	// {
	// 	dispatch( toggleShowLoading( true ) )
	// 	const rs = await AnswerService.getDetailData( id );
	// 	dispatch( toggleShowLoading( false ) )

	// 	if ( rs.status === 'success' )
	// 	{
	// 		let data = rs.data;
	// 		if ( data )
	// 		{
	// 			appendForm( {
	// 				content_result: data?.content_result,
	// 				company_id: data?.company_id,
	// 				name: data?.name,
	// 			}, form, setFiles, true )
	// 		}
	// 	}
	// }

	// const getCompanies = async () =>
	// {
	// 	let response;
	// 	if ( props.type === 'user' )
	// 	{

	// 		response = await CompanyService.getDataListByUser(
	// 			{ page: 1, page_size: 1000, status: 'ACTIVE' } );
	// 	} else
	// 	{
	// 		response = await CompanyService.getDataList(
	// 			{ page: 1, page_size: 1000, status: 'ACTIVE' } );
	// 	}
	// 	if ( response.status === 'success' && response.data.result.length > 0 )
	// 	{
	// 		let companies = response.data.result.reduce( ( arr, e ) =>
	// 		{
	// 			arr.push( {
	// 				value: e.id,
	// 				label: e.name
	// 			} )
	// 			return arr;
	// 		}, [] );
	// 		console.log( companies );
	// 		setCompanyConfigs( companies );
	// 	}
	// }

	const submitForm = async ( e ) =>
	{

		dispatch( toggleShowLoading( true ) )

		let formData = { ...e };
		formData.question_id = props.data.question_id;
		formData.answer_id = props.data.answer_id;
		let res;
		if ( props.data.id )
		{
			res = await ResultService.putData( props.data.id, formData );
		} else
		{
			res = await ResultService.createData( formData );
		}
		await timeDelay( 1000 );
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



	const resetFormData = () =>
	{
		resetForm( form )
		props.setShowModal( false );
		setFiles( [] )
		setMes( '' )
		props.setData( null )
	}


	return (
		<Modal show={ props.showModal } size="lg" dialogClassName="dialog-style">
			<Modal.Header style={ { justifyContent: 'center' } }>
				<div className="fs-21">{ 'Chấm điểm' }</div>
			</Modal.Header>
			<Modal.Body>

				<Form
					className='p-3'
					name='nest-messages form'
					form={ form }
					onFinish={ submitForm }
					onFieldsChange={ e => onFieldsChange( e, form ) }
					validateMessages={ e => validateMessages( e, form ) }
				>
					<Row>
						<div className="col-12 mb-2">
							<p className="fs-17 font-weight-bold">Câu hỏi: </p>
							<p className="mb-2"><i>{ props.data?.content_question }</i></p>
						</div>
						<div className="col-12 mb-2">
							<p className="fs-17 font-weight-bold">Câu trả lời: </p>
							<p className="mb-2"><i>{ props.data?.content_answer }</i></p>
						</div>
					</Row>
					<span className="text-danger">{ mes }</span>
					<div className='row'>
						<div className="col-md-12">
							<Form.Item name="content_result" label="Đáp án"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Input.TextArea rows={ 5 } placeholder='Nhập đáp án' />
							</Form.Item>
						</div>
						<div className="col-md-12">
							<Form.Item name="point" label="Điểm"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Input type="number" placeholder='Nhập điểm' />
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
