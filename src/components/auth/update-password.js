import React, { useState } from "react";
import { Container, Row, Col, Button, Form, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../components/HOC/withRouter";
import { RESET_PASSWORD_LOADING_ID } from "../../constants";
import { updatePassword } from "../../actions";
import { isEmpty } from "lodash";
import validate from "../../utility/validators/updatePasswordForm";

const UpdatePassword = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const isValid = () => {
    const { errors, isValid } = validate({
      oldPassword,
      password,
    });
    if (!isValid) {
      setErrors(errors);
    } else {
      setErrors("");
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { updatePassword } = props;
    console.log('jns')
    if (isValid()) {
      updatePassword({
        oldPassword,
        password
      })
      setErrors(null);
    }
  };

  return (
    <>
      <section className="m-profile setting-wrapper">
        <Container>
          <Row className="row justify-content-center align-items-center height-self-center">
            <Col lg="5" md="12" className="align-self-center">
              {!isEmpty(props.errorMessage) ? (
                <div className="signup-user_error">
                  {(props.errorMessage && props.errorMessage.data.message) ||
                    (props.errorMessage && props.errorMessage.data.error)}
                </div>
              ) : null}
              {!isEmpty(props.responseMessage) ? (
                <div className="signup-user_success">
                  {props.responseMessage}
                </div>
              ) : null}
              <br />
              <div className="sign-user_card ">
                <div className="sign-in-page-data">
                  <div className="sign-in-from w-100 m-auto">
                    <h3 className="mb-3 text-center">Change Password</h3>
                    {/* <p className="text-body">Enter your new password.</p> */}
                    <Form onSubmit={handleSubmit} className="mt-4">
                      <Form.Group>
                        <FormControl
                          type="password"
                          className="form-control mb-0"
                          id="exampleInputEmailreg"
                          placeholder="Current Password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          disabled={props.isLoading}
                          autoComplete="new-password"
                        />
                        <span className="input-errors">
                          {errors && errors.oldPasswordError}
                        </span>
                      </Form.Group>
                      <br />
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
                      <div className="sign-info">
                        <Button
                          className="btn btn-hover btn-primary1"
                          type="submit"
                          disabled={props.isLoading}
                        >
                          Update password
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
  connect(mapStateToProps, { updatePassword })(UpdatePassword)
);
