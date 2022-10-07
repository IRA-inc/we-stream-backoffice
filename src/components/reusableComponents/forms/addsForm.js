import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Card from "../../../components/Card";
import ButtonLoader from "../../reusableComponents/Loaders/buttonLoader";
import responseComponent from "../../../helpers/responseComponent";
import moment from 'moment'

const { ErrorResponse, SuccessResponse } = responseComponent;

const AddForm = (props) => {
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
    imageFile,
    imageResult,
    handleUploadChange,
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
                    <Col sm="6" className="col-6 form-group">
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="company"
                          value={state.company}
                          onChange={handleInputChange}
                          placeholder="Company"
                        />
                      </Form.Group>
                      </Col>
                      <Col sm="6" className="col-6 form-group">
                      <Form.Group>
                          <Form.Label htmlFor="exampleInputtime">
                            Start Date:
                          </Form.Label>
                          <Form.Control type="date" 
                           name="startingDate"
                           value={state.startingDate}
                           min={moment().format("YYYY-MM-DD")}
                           max={state.endDate!==""?state.endDate:""}
                           onChange={handleInputChange}
                          placeholder="Start Date" />
                        </Form.Group>
                        </Col>
                        <Col sm="6" className="col-6 form-group">
                        <Form.Group>
                          <Form.Label htmlFor="exampleInputtime">
                            End Date:
                          </Form.Label>
                          <Form.Control type="date" 
                          name="endDate"
                          value={state.endDate}
                          min={state.startingDate!==""?state.startingDate:""}
                          onChange={handleInputChange}
                          placeholder="End Date" 
                          required
                          />
                        </Form.Group>
                        </Col>
                        <Col sm="6" className="col-6 form-group">
                        <Form.Group>
                          <Form.Label htmlFor="exampleInputtime">
                            Start Time:
                          </Form.Label>
                          <Form.Control type="time" 
                           name="startTime"
                           value={state.startTime}
                           min={moment().format("HH:mm")}
                           max={state.endTime!==""?state.endTime:""}
                           onChange={handleInputChange}
                           placeholder="Start Time"
                           required
                           />
                        </Form.Group>
                        </Col>
                        <Col sm="6" className="col-6 form-group">
                        <Form.Group>
                          <Form.Label htmlFor="exampleInputtime">
                            End time:
                          </Form.Label>
                          <Form.Control 
                          type="time" 
                          name="endTime"
                          value={state.endTime}
                          min={state.startTime!==""?state.startTime:""}
                          onChange={handleInputChange}
                          placeholder="End time"
                          required
                          />
                        </Form.Group>
                        <Col sm="6" className="col-6 form-group"></Col>
                        <Form.Group>
                        <Form.Control type="number" 
                      name="amount"
                      value={state.amount}
                      min={1}
                      onChange={handleInputChange}
                      placeholder="price" 
                      required
                      />
                       </Form.Group>
                       </Col>
                       <Col sm="6" className="col-6 form-group">
                        <Form.Group>
                          <select
                            className="form-control"
                            // id="exampleFormControlSelect2"
                            name="place"
                            value={state.palce}
                            onChange={handleInputChange}
                            required
                          >
                            <option>Choose palce</option>
                            <option value="side-up">side-up</option>
                            <option value="side-down">side-down</option>
                            <option value="header-left">header-left</option>
                            <option value="header-right">header-right</option>
                          </select>
                        </Form.Group>
                        </Col>
                        <Col sm="6" className="col-6 form-group">
                        <div className="form_gallery form-group">
                          <label id="gallery2" htmlFor="form_gallery-upload">
                          Updated Banner
                          </label>
                          <input
                            data-name="#gallery2"
                            id="form_gallery-upload"
                            className="form_gallery-upload"
                            type="file"
                            name="file"
                            // value={state.banner}
                            onChange={handleUploadChange}
                            accept=".png, .jpg, .jpeg"
                          />
                        </div>
                        {imageResult?
                       <div className="col-12 d-block position-relative mb-2">
                            <img src={imageResult} className="img-fluid mr-2" alt="" style={{width:"150px",height:"100px"}}/>
                            {imageFile?.name?imageFile?.name:"Upload Banner"}
                            </div>:""}
                            </Col>
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

export default AddForm;
