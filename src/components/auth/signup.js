import React, { useState } from "react";
import { Container, Button, Row, Col, Form, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { withRouter } from "../../components/HOC/withRouter";
import { SIGN_UP_LOADING_ID } from "../../constants";
import { signupUser } from "../../actions";
import { isEmpty } from "lodash";
import validate from "../../utility/validators/signupForm";

const SignUp = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  const isValid = () => {
    const { errors, isValid } = validate({
      username,
      password,
      confirmPassword,
      name,
      email,
      phoneNumber,
    });
    if (!isValid) {
      setErrors(errors);
    } else {
      setErrors('');
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { signupUser } = props;
    if (isValid()) {
      signupUser({
        username,
        password,
        name,
        email,
        phoneNumber,
      });
      setErrors(null)
    }
  };

  return !isEmpty(props.currentUser) ? (
    <Navigate to="/" />
  ) : (
    <>
      <section className="sign-in-page">
        <Container>
          <Row className="justify-content-center align-items-center height-self-center">
            <Col lg="7" md="12" className="align-self-center">
              {!isEmpty(props.errorMessage) ? (
                (isEmpty(props.responseMessage)) ?
                (
                <div className="signup-user_error">
                  {
                    (props.errorMessage && props.errorMessage.data.message) 
                    || (props.errorMessage && props.errorMessage.data.error)
                  }
                </div>
                ) :
                (
                <div className="signup-user_success">
                  {props.responseMessage}
                </div>
                )) : null
              }
            <br/>
              <div className="sign-user_card">
                <div className="sign-in-page-data">
                  <div className="sign-in-from w-100 m-auto">
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="6">
                          <Form.Group>
                          <Form.Label>Username</Form.Label>
                            <FormControl
                              type="text"
                              className="form-control mb-0"
                              id="exampleInputEmailreg"
                              placeholder="Enter username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              disabled={props.isLoading}
                              autoComplete="new-password"
                              // required
                            />
                            <span className='input-errors'>
                              {errors && errors.usernameError}
                            </span>
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <Form.Group>
                          <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="text"
                              className="mb-0"
                              id="exampleInputEmail3"
                              placeholder="Enter email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              disabled={props.isLoading}
                              autoComplete="off"
                              // required
                            />
                             <span className='input-errors'>
                              {errors && errors.emailError}
                            </span>
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <Form.Group>
                          <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              type="text"
                              className="mb-0"
                              id="exampleInputEmail2"
                              placeholder="Phone Number"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              autoComplete="off"
                              // required
                            />
                            <span className='input-errors'>
                              {errors && errors.phoneNumberError}
                            </span>
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <Form.Group>
                          <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              className="mb-0"
                              id="exampleInputEmail3"
                              placeholder="Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              autoComplete="off"
                              // required
                            />
                            <span className='input-errors'>
                              {errors && errors.nameError}
                            </span>
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <Form.Group>
                          <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              className="mb-0"
                              id="exampleInputPassword2"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              // required
                            />
                            <span className='input-errors'>
                              {errors && errors.passwordError}
                            </span>
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <Form.Group>
                          <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                              type="password"
                              className="mb-0"
                              id="exampleInputPassword2"
                              placeholder="Confirm Password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              // required
                            />
                            <span className='input-errors'>
                              {errors && errors.passwordConfirmError}
                            </span>
                          </Form.Group>
                        </Col>
                      </Row>
                      {/* <div className="custom-control custom-radio mt-2">
                                                <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input"/>
                                                <label className="custom-control-label" htmlFor="customRadio1">Premium-$39 / 3 Months with a 5 day free trial</label>
                                            </div>
                                            <div className="custom-control custom-radio mt-2">
                                                <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input"/>
                                                <label className="custom-control-label" htmlFor="customRadio2"> Basic- $19 / 1 Month</label>
                                            </div>
                                            <div className="custom-control custom-radio mt-2">
                                                <input type="radio" id="customRadio3" name="customRadio" className="custom-control-input"/>
                                                <label className="custom-control-label" htmlFor="customRadio3">Free-Free</label>
                                            </div> */}
                      <Button
                        // onClick={() => history.push("/")}
                        type="submit"
                        disabled={props.isLoading}
                        className="btn btn-hover btn-primary1 my-2"
                      >
                        Sign Up
                      </Button>
                    </Form>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="d-flex justify-content-center links">
                    Already have an account?
                    <Link to="/login" className="text-primary ml-2">
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

function mapStateToProps(state) {
  const { loader, errorMessage, responseMessage } = state;
  const { isLoading } = loader[SIGN_UP_LOADING_ID] || {
    isLoading: false,
  };
  // const { messages } = values(notificationMessages);
  return { 
    errorMessage, 
    isLoading,
    errorMessage,
    responseMessage
    // notificationMessages: messages[messages.length -1] || {}
  };
}

export default withRouter(connect(mapStateToProps, { signupUser })(SignUp));
