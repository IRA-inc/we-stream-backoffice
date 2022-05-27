import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Card from "../../../components/Card";
import ButtonLoader from "../../reusableComponents/Loaders/buttonLoader";
import responseComponent from "../../../helpers/responseComponent";

const { ErrorResponse, SuccessResponse } = responseComponent;

const PayoutForm = (props) => {
  const {
    state,
    handleInputChange,
    handleSubmit,
    isLoading,
    show,
    setShow,
    Errors,
    title,
    message,
  } = props;

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
                    <Form onSubmit={handleSubmit} >
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="transaction_id"
                          value={state.transaction_id}
                          onChange={handleInputChange}
                          placeholder="Name"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          type="number"
                          name="amount"
                          value={state.amount}
                          onChange={handleInputChange}
                          placeholder="Amount"
                        />
                      </Form.Group>
                      
                      <Form.Group className="form-group">
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
                        <Button
                          type="submit"
                          variant=" btn-primary"
                          disabled={!!isLoading}
                        >
                          {isLoading ? <ButtonLoader /> : "Submit"}
                        </Button>{" "}
                        <Button type="reset" variant=" btn-danger">
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

export default PayoutForm;
