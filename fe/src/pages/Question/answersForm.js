import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { Pagination, Typography, message, Form, Input, Select, Upload, Button } from "antd";
import { useDispatch } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import { toggleShowLoading } from "../../redux/actions/common";
import { AnswerService } from "../../services/answer";
import { onFieldsChange, resetForm, timeDelay, validateMessages } from "../../services/common";

export const AnswerResultForm = ( props ) =>
{
	const [ form ] = useForm();
	const modal = props.modal;
	const dispatch = useDispatch();
	const [ mes, setMes ] = useState( '' );

	useEffect( () =>
	{
	}, [] );


	useEffect( () =>
	{
		if ( props.id )
		{
		}
	}, [ props.id ] );


	const submitForm = async ( e ) =>
	{
		let formData = { ...e };
		if(!modal?.question_id) {
			setMes('Vui lòng chọn câu hỏi!');
			return;
		}
		formData.question_id = modal.question_id;

		let res;
		if ( props.id )
		{
			res = await AnswerService.putData( props.id, formData );
		} else
		{
			res = await AnswerService.createData( formData );
		}
		await timeDelay(1000)
		if ( res.status === 'success' )
		{

			reset();
			message.success( 'Successfully' );
			props.getDataList( { ...props.paging, page: 1 } );
		} else
		{
			setMes( res.message );
			dispatch( toggleShowLoading( false ) )

		}
	}

	const reset = () =>
	{
		resetForm( form )
		props.setShowModal( false );
		setMes( '' );
		// props.setId( null )
	}


	return (
		<Modal show={ props.showModal } size="lg" dialogClassName="dialog-style">
			<Modal.Header style={ { justifyContent: 'center' } }>
				<h4 className="fs-20">{ modal?.title || 'Trả lời câu hỏi' }</h4>


			</Modal.Header>
			<Modal.Body>
				<div className="fs-17 mb-4">
					<h4>
						Câu hỏi:
					</h4>
					<i className="ms-2">
						{ modal?.content }
					</i>
				</div>
				<Form
					className='p-3'
					name='nest-messages form'
					form={ form }
					onFinish={ submitForm }
					onFieldsChange={ e => onFieldsChange( e, form ) }
					validateMessages={ e => validateMessages( e, form ) }
				>
					<Row>
						<span className="text-danger">{ mes }</span>
						<Col md={12}>
							<Form.Item name="content_answer" label="Câu trả lời"
								rules={ [ { required: true } ] }
								className=' d-block'>
								<Input.TextArea rows={ 5 } placeholder='Nhập câu trả lời của bạn' />
							</Form.Item>
						</Col>
					</Row>

					<div className='d-flex justify-content-center'>
						<button type="submit"
							className="btn btn-primary text-center"
							style={ { marginRight: 10, padding: '10px 10px' } }>
							Submit
						</button>
						<button
							type="button"
							className="btn btn-secondary text-center"
							style={ { marginRight: 10, padding: '10px 10px' } }
							onClick={ () => reset }>
							Cancel
						</button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
