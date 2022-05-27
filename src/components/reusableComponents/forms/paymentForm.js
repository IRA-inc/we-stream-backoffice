import React, {useEffect} from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Card from "../../../components/Card";
import ButtonLoader from "../../reusableComponents/Loaders/buttonLoader";
import responseComponent from "../../../helpers/responseComponent";
import { isEmpty } from "lodash";
import { Route, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { getOneUser } from "../../../actions";

const { ErrorResponse, SuccessResponse } = responseComponent;

const PaymentForm = (props) => {
  const navigate = useNavigate();

  const {
    state,
    handleInputChange,
    handleSubmit,
    toggleModal,
    isLoading,
    show,
    setShow,
    Errors,
    title,
    message,
    responseMessage,
    amount,
    isCard,
  } = props;

  useEffect(() => {
    if(isCard === true && responseMessage !== null && !isEmpty(responseMessage?.checkoutLink)) {
      sessionStorage.setItem('EventId', state.eventId);
      window.location.replace(responseMessage.checkoutLink)
    }
  }, [responseMessage]);

  console.log("state===>",state)
  return (
    <>
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <Card.Header.Title>
                  <h4 className="card-title">{title}</h4>
                </Card.Header.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col lg="12">
                    <Form onSubmit={handleSubmit}>
                      {isCard ? (
                        <>
                          <Form.Group>
                            <label>Names</label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={state?.name}
                              onChange={handleInputChange}
                              placeholder="Names"
                              disabled
                            />
                          </Form.Group>
                          <Form.Group>
                            <label>Email</label>
                            <Form.Control
                              type="text"
                              name="email"
                              value={state?.email}
                              onChange={handleInputChange}
                              placeholder="email"
                              disabled
                            />
                          </Form.Group>
                        </>
                      ) : null}
                      <Form.Group>
                        <label>Phone</label>
                        <Form.Control
                          type="text"
                          name="phoneNumber"
                          value={state?.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="Phone"
                          disabled={isCard === true ? true : false}
                        />
                      </Form.Group>
                      <Form.Group>
                        <label>Amount </label>
                        <Form.Control
                          type="text"
                          name="=amount"
                          value={state?.amount}
                            // onChange={handleInputChange}
                          placeholder="amount"
                          disabled
                        />
                      </Form.Group>
                      <div 
                        className="mt-2"
                        style={{
                          width: '100%'
                        }}
                      >
                        {Errors.length > 0 ? (
                          <ErrorResponse
                            Error={Errors}
                            show={show}
                            setShow={setShow}
                          />
                        ) : (
                          ""
                        )}
                        {Errors.length === 0 && show === true ? (
                          <SuccessResponse
                            message={message}
                            show={show}
                            setShow={setShow}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <Form.Group>
                        <Button
                          type="submit"
                          variant=" btn-primary"
                          disabled={isLoading || isEmpty(state.phoneNumber)}
                        >
                          {isLoading ? <ButtonLoader /> : "confirm"}
                        </Button>{" "}
                        <Button
                          onClick={() => toggleModal()}
                          variant=" btn-danger"
                        >
                          Cancel
                        </Button>

                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PaymentForm;
