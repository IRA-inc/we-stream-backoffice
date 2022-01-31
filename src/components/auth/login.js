import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { loginUser } from "../../actions";
import { withRouter } from "../../components/HOC/withRouter";
import { SIGN_IN_LOADING_ID } from "../../constants";
import validate from "../../utility/validators/signInForm";
import queryString from "query-string";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const history =useNavigate()
  const isValid = () => {
    const { errors, isValid } = validate({ username, password });
    if (!isValid) {
      setErrors(errors);
    } else {
      setErrors({});
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { loginUser } = props;
    if (isValid()) {
      loginUser({ username, password });
      setErrors(null)
    }
  };

  useEffect(() => {
    if(isEmpty(props.currentUser)===false){
      console.log("====>",isEmpty(props.currentUser));
      if(props?.currentUser?.role?.map((roles) => roles.name).includes("SUPERADMIN")){
        history("/dashboard")
        return
      }
        if(props?.currentUser?.role?.map((roles) => roles.name).includes("EVENTOWNER")){
        history("/mydashboard")
        return
      }
      else{
      history("/")
      }
    }
  }, [props,history]);

  const location = useLocation();

  const parsedUrl = queryString.parse(location.search);
  return !isEmpty(props.currentUser) ? (
    <Navigate to={props.currentUser.role.length===0?"/":"/dashboard"} />
  ) : (
    <>
      <section className="sign-in-page">
        <Container>
          <Row className="justify-content-center align-items-center height-self-center">
            <Col lg="5" md="12" className="align-self-center">
              {!isEmpty(props.errorMessage) ? (
                <div className="signup-user_error">
                  {(props.errorMessage && props.errorMessage.data.message) ||
                    (props.errorMessage && props.errorMessage.data.error)}
                </div>
              ) : null}
              {!isEmpty(props.responseMessage) ? (
                <div className="signup-user_error">
                  {props.responseMessage}
                </div>
              ) : null}
              {isEmpty(props.errorMessage) && isEmpty(props.responseMessage) && !isEmpty(parsedUrl) && isEmpty(username) ? (
                <div className="signup-user_error">
                  Account already verified
                </div>
              ) : null}
              <br />
              <div className="sign-user_card ">
                <div className="sign-in-page-data">
                  <div className="sign-in-from w-100 m-auto">
                    <h3 className="mb-3 text-center">Sign in</h3>
                    <Form onSubmit={handleSubmit} className="mt-4">
                      <Form.Group>
                        <FormControl
                          type="text"
                          className="form-control mb-0"
                          id="exampleInputEmail1"
                          placeholder="Enter username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          disabled={props.isLoading}
                          autoComplete="off"
                          // required
                        />
                        <span className="input-errors">
                          {errors && errors.usernameError}
                        </span>
                      </Form.Group>
                      <br />
                      <Form.Group>
                        <FormControl
                          type="password"
                          className="form-control mb-0"
                          id="exampleInputPassword2"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={props.isLoading}
                          // required
                        />
                        <span className="input-errors">
                          {errors && errors.passwordError}
                        </span>
                      </Form.Group>
                      <div className="sign-info">
                        <Button
                          className="btn btn-hover btn-primary1"
                          type="submit"
                          disabled={props.isLoading}
                        >
                          Sign in
                        </Button>
                        <div className="custom-control custom-checkbox d-inline-block">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck"
                          >
                            Remember Me
                          </label>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="d-flex justify-content-center links">
                    Don't have an account?
                    <Link to="/sign-up" className="text-primary ml-2">
                      Sign Up
                    </Link>
                  </div>
                  <div className="d-flex justify-content-center links">
                    <Link to="/reset-link" className="f-link">
                      Forgot your password?
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
  const { currentUser, errorMessage, responseMessage, loader } = state;
  const { isLoading } = loader[SIGN_IN_LOADING_ID] || {
    isLoading: false,
  };
  return { currentUser, isLoading, errorMessage, responseMessage };
}

export default withRouter(connect(mapStateToProps, { loginUser })(Login));
