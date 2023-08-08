import React, { useState } from "react";
import { Card, CardBody, Col, Container, Input, Row } from "reactstrap";

//Import Image
import lightLogo from "../../assets/images/logo-light.png";
import darkLogo from "../../assets/images/logo-dark.png";

import signInImage from "../../assets/images/auth/sign-in.png";
import { Link } from "react-router-dom";
import { AUTH_SERVICE } from "../../services/authService";
import { Form } from "react-bootstrap";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "../../redux/actions/common";
import { timeDelay } from "../../services/common";

const SignIn = () => {
  document.title = "Đăng nhập";

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch()

  const submitForm = async () => {
    if (username && password) {
      let data = { username: username, password: password };

	  dispatch(toggleShowLoading(true))
      const response = await AUTH_SERVICE.login(data);
		await timeDelay(1000);
	  dispatch(toggleShowLoading(false))

      if (response?.status == 'success') {
        localStorage.setItem('access_token', response.data?.token_info?.access_token);
        localStorage.setItem('name', response.data?.user?.name);
        localStorage.setItem('email', response.data?.user?.email);
        localStorage.setItem('type', response.data?.user?.type);
        localStorage.setItem('avatar', response.data?.user?.avatar);
		message.success('Đăng nhập thành công');
		await timeDelay(500)
        window.location.href = '/';
      } else {
        message.error(response?.message || 'error');
      }

    } else {
      if (!username) setUsernameError("Tên đăng nhặp không được bỏ trống!");
      if (!password) setPasswordError("Mật khẩu không được bỏ trống!");
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
                  <Col xl={10} md={12}>
                    <Card className="auth-box">
                      <Row className="g-0">
                        <Col md={6} className="text-center">
                          <CardBody className="p-4">
                            
                            <div className="mt-5">
                              <img
                                src={signInImage}
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                          </CardBody>
                        </Col>
                        <Col md={6}>
                          <CardBody className="auth-content p-5 h-100 text-white">
                            <div className="w-100">
                              <div className="text-center mb-4">
                                <h5>Chào mừng bạn !</h5>
                                <p className="text-white-70">
                                  Vui lòng đăng nhập.
                                </p>
                              </div>
                              <Form action="/" className="auth-form">
                                <div className="mb-3">
                                  <label
                                    htmlFor="usernameInput"
                                    className="form-label"
                                  >
                                    Username
                                  </label>
                                  <Input
                                    type="text"
                                    className={`form-control ${usernameError && 'error'}`}
                                    id="usernameInput"
                                    placeholder="Enter your username"
                                    required
                                    onChange={(e) => { setUsername(e.target.value); setUsernameError('') }}
                                  />
                                  {usernameError && <p style={{ color: 'rgb(255, 80, 80)', fontSize: 12, marginTop: 5 }}>{usernameError}</p>}
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="passwordInput"
                                    className="form-label"
                                  >
                                    Password
                                  </label>
                                  <Input
                                    type="password"
                                    className={`form-control ${passwordError && 'error'}`}
                                    id="passwordInput"
                                    placeholder="Enter your password"
                                    required
                                    onChange={(e) => { setPassword(e.target.value); setPasswordError('') }}
                                  />
                                  {passwordError && <p style={{ color: 'rgb(255, 80, 80)', fontSize: 12, marginTop: 5 }}>{passwordError}</p>}
                                </div>
                                <div className="text-center">
                                  <button
                                    type="button"
                                    className="btn btn-white btn-hover w-100"
                                    onClick={submitForm}
                                  >
                                    Đăng nhập
                                  </button>
                                </div>
                              </Form>
                              <div className="mt-4 text-center">
                                <p className="mb-0">
                                  Nếu không có tài khoản ?{" "}
                                  <Link
                                    to="/signup"
                                    className="fw-medium text-white text-decoration-underline"
                                  >
                                    {" "}
                                    Đăng ký{" "}
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
