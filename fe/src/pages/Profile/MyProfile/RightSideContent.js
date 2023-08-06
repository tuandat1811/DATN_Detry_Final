import React, { useEffect, useState } from "react";
import
{
	Col,
	Row,
	Nav,
	NavLink,
	TabContent,
	TabPane,
	Card,
	NavItem,
	CardBody,
	Label
} from "reactstrap";

//Images Import
import { Link } from "react-router-dom";
import { DEFAULT_USER, normFile, onErrorUser, onFieldsChange, resetForm, validateMessages } from "../../../services/common";
import { useForm } from "antd/lib/form/Form";
import { toggleShowLoading } from "../../../redux/actions/common";
import { AUTH_SERVICE } from "../../../services/authService";
import { Form, Input, Upload, message } from "antd";
import { useDispatch } from "react-redux";
import { appendForm, uploadFileAvatar } from "../../../services/common/helpersFnc";

const RightSideContent = ( props ) =>
{

	const [ avatar, setAvatar ] = useState( { file: null, base64: null } );
	const [ form ] = useForm();
	const [ formPassword ] = useForm();
	const [ tabs, setTab ] = useState( '1' );
	const [ files, setFiles ] = useState( [] );
	const [ mes, setMes ] = useState( '' );


	const dispatch = useDispatch();

	const toggleTab = ( tab ) =>
	{
		if ( tabs !== tab )
		{
			setTab( tab )
		}
	}

	const submitForm = async ( e ) =>
	{
		dispatch( toggleShowLoading( true ) )
		let formData = { ...e };

		if ( tabs === "1" )
		{
			let avatar = await uploadFileAvatar( files );


			delete formData.image;
			formData.avatar = avatar;
		} else
		{

			delete formData.current_password;
		}


		let res = await AUTH_SERVICE.updateProfile( formData );
		if ( res.status === 'success' )
		{
			setMes( '' )
			message.success( 'Successfully', 10 );
		} else
		{
			setMes( res.message );
			message.error( res.message )
		}
		dispatch( toggleShowLoading( false ) )
	}

	useEffect( () =>
	{
		if ( props.userInfo )
		{
			let data = props.userInfo;
			appendForm( {
				phone: data?.phone || null,
				avatar: data?.avatar || null,
				email: data?.email || null,
				name: data?.name || null,
			}, form, setFiles, true );
		}
		console.log( props.useForm );
	}, props.userInfo?.id )


	return (
		<React.Fragment>
			<Col md={ 8 }>
				<Card className="profile-content-page mt-4 mt-lg-0">
					<Nav
						className="profile-content-nav nav-pills border-bottom mb-4"
						id="pills-tab"
						role="tablist"
					>
						<NavItem role="presentation">
							<NavLink
								to="1"
								className={ tabs === "1" ? 'active' : '' }
								type="button"
								onClick={ () => { toggleTab( "1" ) } }
							>
								Thông tin tài khoản
							</NavLink>
						</NavItem>
						<NavItem role="presentation">
							<NavLink
								className={ tabs === "2" ? 'active' : '' }
								onClick={ () => { toggleTab( "2" ) } }
								type="button"
							>
								Thay đổi mật khẩu
							</NavLink>
						</NavItem>
					</Nav>

					<CardBody className="p-4">
						<TabContent activeTab={ tabs }>
							<TabPane tabId="1">
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
											<Form.Item
												label="Images"
												name="image"
												accept="images/**"
												className='d-block text-center profile-user'
												valuePropName="fileList"
												fileList={ files }
												getValueFromEvent={ ( e ) => normFile( e, setFiles ) }
											>
												<Upload action="/upload" listType="picture-card" className="profile-img">
													{ files.length <= 0 && <div>
														<div style={ { marginTop: 8 } }><i className="uil uil-edit"></i></div>
													</div> }
												</Upload>
											</Form.Item>
										</div>
										<div className="col-md-12">
											<Form.Item name="name" label="Họ và tên"
												rules={ [ { required: true } ] }
												className=' d-block'>
												<Input placeholder='Nhập họ và tên' />
											</Form.Item>
										</div>

										<div className="col-md-12">
											<Form.Item name="email" label="Email"
												rules={ [ { required: true } ] }

												className=' d-block'>
												<Input placeholder='Nhập email' />
											</Form.Item>
										</div>

										<div className="col-md-12">
											<Form.Item name="phone" label="Số điện thoại"
												rules={ [ { required: true } ] }
												className=' d-block'>
												<Input placeholder='Nhập số điện thoại' />
											</Form.Item>
										</div>
									</div>
									<div className="mt-4 text-end">
										<button className="btn btn-primary">
											Update
										</button>
									</div>
								</Form>
							</TabPane>

							<TabPane tabId="2">
								<Form
									className='p-3'
									name='nest-messages form'
									form={ formPassword }
									onFinish={ submitForm }
									onFieldsChange={ e => onFieldsChange( e, form ) }
									validateMessages={ e => validateMessages( e, form ) }
								>
									<div className='row'>

										<div className="col-md-12">
											<Form.Item name="current_password" label="Mật khẩu cũ"
												rules={ [ { required: true } ] }
												className=' d-block'>
												<Input.Password placeholder='Nhập mật khẩu cũ' />
											</Form.Item>
										</div>

										<div className="col-md-12">
											<Form.Item name="password" label="Mật khẩu mới"
												rules={ [ { required: true } ] }
												className=' d-block'>
												<Input.Password placeholder='Nhập mật khẩu mới' />
											</Form.Item>
										</div>
									</div>
									<div className="mt-4 text-end">
										<button className="btn btn-primary">
											Update
										</button>
									</div>
								</Form>
							</TabPane>
						</TabContent>
					</CardBody>
				</Card>
			</Col>
		</React.Fragment>
	);
};

export default RightSideContent;
