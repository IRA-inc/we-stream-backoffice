import React, { useState } from "react";
import { Container, Row, Col, Button, Form, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { withRouter } from "../../components/HOC/withRouter";
import { RESET_PASSWORD_LOADING_ID } from "../../constants";
import { resetPassword } from "../../actions";
import { isEmpty } from "lodash";
import validate from "../../utility/validators/resetForm";
import queryString from "query-string";

const RecoverPassword = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const isValid = () => {
    const { errors, isValid } = validate({
      password,
      confirmPassword,
    });
    if (!isValid) {
      setErrors(errors);
    } else {
      setErrors("");
    }
    return isValid;
  };

  const location = useLocation();

  const parsedUrl = queryString.parse(location.search);
  console.log('parsedUrl==>', parsedUrl.token)

  const handleSubmit = (e) => {
    e.preventDefault();
    const { resetPassword } = props;
    if (isValid()) {
      resetPassword({
        password,
        token: parsedUrl.token,
      });
      setErrors(null);
    }
  };

  return !isEmpty(props.responseMessage) ? (
    <Navigate to="/login" />
  ) : (
    <>
      <section className="sign-in-page">
        <Container>
          <Row className="row justify-content-center align-items-center height-self-center">
            <Col lg="5" md="12" className="align-self-center">
              {!isEmpty(props.errorMessage) ? (
                <div className="signup-user_error">
                  {(props.errorMessage && props.errorMessage.data.message) ||
                    (props.errorMessage && props.errorMessage.data.error)}
                </div>
              ) : null}
              <br />
              <div className="sign-user_card ">
                <div className="sign-in-page-data">
                  <div className="sign-in-from w-100 m-auto">
                    <h3 className="mb-3 text-center">Reset Password</h3>
                    <p className="text-body">Enter your new password.</p>
                    <Form onSubmit={handleSubmit} className="mt-4">
                      <Form.Group>
                        <FormControl
                          type="password"
                          className="form-control mb-0"
                          id="exampleInputEmailreg"
                          placeholder="New Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={props.isLoading}
                          autoComplete="new-password"
                        />
                        <span className="input-errors">
                          {errors && errors.passwordError}
                        </span>
                      </Form.Group>
                      <br />
                      <Form.Group>
                        <FormControl
                          type="password"
                          className="form-control mb-0"
                          id="exampleInputEmailreg"
                          placeholder="Confirm New Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          disabled={props.isLoading}
                          autoComplete="new-password"
                        />
                        <span className="input-errors">
                          {errors && errors.passwordConfirmError}
                        </span>
                      </Form.Group>
                      <div className="sign-info">
                        <Button
                          className="btn btn-hover btn-primary1"
                          type="submit"
                          disabled={props.isLoading}
                        >
                          Reset
                        </Button>
                      </div>
                    </Form>
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
  const { isLoading } = loader[RESET_PASSWORD_LOADING_ID] || {
    isLoading: false,
  };

  return {
    errorMessage,
    isLoading,
    errorMessage,
    responseMessage,
  };
}

export default withRouter(
  connect(mapStateToProps, { resetPassword })(RecoverPassword)
);
