import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Card, Col, Input, Row, CardBody } from "reactstrap";

import lightLogo from "../../assets/images/logo-light.png";
import darkLogo from "../../assets/images/logo-dark.png";

import signUpImage from "../../assets/images/auth/sign-up.png";
import { Form } from "react-bootstrap";
import { AUTH_SERVICE } from "../../services/authService";
import { Select, message } from "antd";
import { CompanyService } from "../../services/company";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "../../redux/actions/common";
import { timeDelay } from "../../services/common";

const SignUp = () =>
{
	document.title = "Đăng ký";



	const [ username, setUsername ] = useState();
	const [ password, setPassword ] = useState();
	const [ email, setEmail ] = useState();
	const [ company_id, setCompanyId ] = useState();
	const [ fullName, setFullName ] = useState();
	const [ usernameError, setUsernameError ] = useState( '' );
	const [ passwordError, setPasswordError ] = useState( '' );
	const [ fullNameError, setFullNameError ] = useState( '' );
	const [ emailError, setEmailError ] = useState( '' );
	const dispatch = useDispatch()

	const submitForm = async () =>
	{
		if ( fullName && username && password && email )
		{
			let data = {
				username: username,
				password: password,
				email: email,
				name: fullName
			};
			dispatch( toggleShowLoading( true ) )

			const response = await AUTH_SERVICE.register( data );
			await timeDelay( 1000 );
			dispatch( toggleShowLoading( false ) )
			if ( response?.status == 'success' )
			{
				message.success( 'Tạo tài khoản thành công' );
				await timeDelay( 500 );
				window.location.href = '/signin';
			} else if ( response?.status === 'fail' )
			{
				let error = response.data;
				if ( error ) {
					if ( error.username ) setUsernameError( error.username[ 0 ] ) 
					else setUsernameError('');

					if ( error.password ) setPasswordError( error.password[ 0 ] );
					else setPasswordError('');

					if ( error.email ) setEmailError( error.email[ 0 ] ) 
					else setEmailError('');
				}
			} else {
				message.error( response?.message || 'error' );
			}

		} else
		{
			if ( !username ) setUsernameError( "Tên đăng nhặp không được bỏ trống!" );
			if ( !password ) setPasswordError( "Mật khẩu không được bỏ trống!" );
			if ( !email ) setEmailError( "Email không được để trống!" );
			if ( !fullName ) setEmailError( "Full không được để trống!" );
		}
	}

	return (
		<React.Fragment>
			<div>
				<div className="main-content">
					<div className="page-content">
						<section className="bg-auth">
							<Container>
								<Row className="justify-content-center">
									<Col xl={ 10 } md={ 12 }>
										<Card className="auth-box">
											<Row className="align-items-center">
												<Col md={ 6 } className="text-center">
													<CardBody className="p-4">

														<div className="mt-5">
															<img
																src={ signUpImage }
																alt=""
																className="img-fluid"
															/>
														</div>
													</CardBody>
												</Col>
												<Col md={ 6 }>
													<CardBody className="auth-content p-5 text-white">
														<div className="w-100">
															<div className="text-center">
																<h5 className="text-white-70">
																	Mẫu đăng ký
																</h5>
															</div>
															<Form action="/" className="auth-form">
																<div className="mb-3">
																	<label
																		htmlFor="usernameInput"
																		className="form-label"
																	>
																		Họ và tên
																	</label>
																	<Input
																		type="text"
																		className={ `form-control ${ fullNameError && 'error' }` }
																		required
																		id="usernameInput"
																		placeholder="Nhập họ và tên"
																		onChange={ ( e ) => { setFullName( e.target.value ); setFullNameError( '' ) } }
																	/>
																	{ fullNameError && <p style={ { color: 'rgb(255, 80, 80)', fontSize: 12, marginTop: 5 } }>{ fullNameError }</p> }
																</div>
																<div className="mb-3">
																	<label
																		htmlFor="usernameInput"
																		className="form-label"
																	>
																		Username
																	</label>
																	<Input
																		type="text"
																		className={ `form-control ${ usernameError && 'error' }` }
																		required
																		id="usernameInput"
																		placeholder="Nhập username"
																		onChange={ ( e ) => { setUsername( e.target.value ); setUsernameError( '' ) } }
																	/>
																	{ usernameError && <p style={ { color: 'rgb(255, 80, 80)', fontSize: 12, marginTop: 5 } }>{ usernameError }</p> }
																</div>
																<div className="mb-3">
																	<label
																		htmlFor="passwordInput"
																		className="form-label"
																	>
																		Email
																	</label>
																	<Input
																		type="email"
																		className={ `form-control ${ emailError && 'error' }` }
																		required
																		id="emailInput"
																		placeholder="Nhập email"
																		onChange={ ( e ) => { setEmail( e.target.value ); setEmailError( '' ) } }
																	/>
																	{ emailError && <p style={ { color: 'rgb(255, 80, 80)', fontSize: 12, marginTop: 5 } }>{ emailError }</p> }
																</div>
																<div className="mb-3">
																	<label
																		htmlFor="emailInput"
																		className="form-label"
																	>
																		Mật khẩu
																	</label>
																	<Input type="password" className={ `form-control ${ passwordError && 'error' }` }
																		id="passwordInput" placeholder="Nhập mật khẩu"
																		onChange={ ( e ) => { setPassword( e.target.value ); setPasswordError( '' ) } }
																	/>
																	{ passwordError && <p style={ { color: 'rgb(255, 80, 80)', fontSize: 12, marginTop: 5 } }>{ passwordError }</p> }
																</div>

																<div className="text-center">
																	<button
																		type="button"
																		className="btn btn-white btn-hover w-100"
																		onClick={ submitForm }
																	>
																		Đăng ký
																	</button>
																</div>
															</Form>
															<div className="mt-3 text-center">
																<p className="mb-0">
																	<Link
																		to="/signin"
																		className="fw-medium text-white text-decoration-underline"
																	>
																		{ " " }
																		Đăng nhập{ " " }
																	</Link>
																</p>
															</div>
														</div>
													</CardBody>
												</Col>
											</Row>
										</Card>
									</Col>
								</Row>
							</Container>
						</section>
					</div>
				</div >
			</div >
		</React.Fragment >
	);
};

export default SignUp;
