import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../components/HOC/withRouter";
import { SEND_RESET_LINK_LOADING_ID } from "../../constants";
import { sendResetLink } from "../../actions";
import { isEmpty } from "lodash";
import validate from "../../utility/validators/resetLink";

const SendPasswordResetLink = (props) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const isValid = () => {
    const { errors, isValid } = validate({
      email,
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
    const { sendResetLink } = props;
    if (isValid()) {
      sendResetLink({
        email,
      });
      setErrors(null);
    }
  };

  return (
    <>
      <section className="sign-in-page">
        <Container>
          <Row className="row justify-content-center align-items-center height-self-center">
            <Col lg="5" md="12" className="align-self-center">
              {!isEmpty(props.errorMessage) ? (
                isEmpty(props.responseMessage) ? (
                  <div className="signup-user_error">
                    {(props.errorMessage && props.errorMessage.data.message) ||
                      (props.errorMessage && props.errorMessage.data.error)}
                  </div>
                ) : (
                  <div className="signup-user_success">
                    {props.responseMessage}
                  </div>
                )
              ) : null}
              <br />
              <div className="sign-user_card ">
                <div className="sign-in-page-data">
                  <div className="sign-in-from w-100 m-auto">
                    <h3 className="mb-3 text-center">Reset Password</h3>
                    <p className="text-body">
                      Enter your email address and we'll send you an email with
                      instructions to reset your password.
                    </p>
                    <Form onSubmit={handleSubmit} className="mt-4">
                      <FormControl
                        type="text"
                        className="form-control mb-0"
                        id="exampleInputEmailreg"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={props.isLoading}
                        autoComplete="new-password"
                      />
                      <span className="input-errors">
                        {errors && errors.emailError}
                      </span>
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
  const { isLoading } = loader[SEND_RESET_LINK_LOADING_ID] || {
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
  connect(mapStateToProps, { sendResetLink })(SendPasswordResetLink)
);
