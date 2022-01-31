import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Card from "../../../components/Card";
import ButtonLoader from "../../reusableComponents/Loaders/buttonLoader";
import responseComponent from "../../../helpers/responseComponent";
import Select from "react-select";
import moment from "moment"
const { ErrorResponse, SuccessResponse } = responseComponent;

const EventForm = (props) => {
  const {
    state,
    handleInputChange,
    handleSubmit,
    isLoading,
    show,
    setShow,
    Errors,
    title,
    staffs,
    isOwner,
    videoPath,
    handleselectedStaff,
    handleselectedCategory,
    categories,
    message,
    imageFile,
    videoFile,
    imageResult,
    handleUploadChange,
  } = props;

  const staffsOptions = staffs?.map((staff) => ({
    value: `${staff._id}`,
    label: `${staff.name}`,
  }));

  const categorysOptions = categories?.map((role) => ({
    value: `${role._id}`,
    label: `${role.name}`,
  }));

  const customStyles = {
    menu: (base) => ({
      ...base,
      background: "#141414",
    }),
    placeholder: (base) => ({
      ...base,
      color: "white",
    }),
    // menuList: base => ({
    //   ...base,
    //   // kill the white space on first and last option
    //   padding: 0
    // }),
    option: (base, state) => ({
      ...base,
      color: state.isFocused ? "black" : "white",
      // kill the white space on first and last option
      padding: 0,
    }),
  };


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
                <Form onSubmit={handleSubmit} enctype="multipart/form-data" method="post" >
                  <Row>
                    <Col lg="7">
                      <Row>
                        <Form.Group className="col-12">
                          <Form.Control 
                          type="text" 
                          name="name"
                          value={state.name}
                          onChange={handleInputChange}
                          placeholder="Name"
                          required
                          />
                        </Form.Group>
                        <div className="col-12 form_gallery form-group">
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
                        <Form.Group className="col-md-6">
                        <Select
                          onChange={handleselectedCategory}
                          placeholder={"Select Category"}
                          required
                          menuPlacement={"auto"}
                          value={categorysOptions?.filter((obj) =>
                            obj.value===state.categoryId)}
                          options={categorysOptions}
                          classNamePrefix="select2-selection"
                          styles={customStyles}
                        />
                        </Form.Group>
                        <Col sm="6" className="form-group">
                          <select
                            className="form-control"
                            id="exampleFormControlSelect2"
                            name="type"
                            value={state.type}
                            onChange={handleInputChange}
                            required
                          >
                            <option>Choose Type</option>
                            <option value="live">Live</option>
                            <option  value="streaming">Streaming</option>
                          </select>
                        </Col>
                        <Form.Group className="col-12">
                                                    <Form.Control as="textarea" id="text" name="description" rows="5"
                                                    value={state.description}
                                                    maxLength={250}
                                                    minLength={10}
                                                    required
                                                    onChange={handleInputChange}
                                                        placeholder="Description"></Form.Control>
                                                    </Form.Group>
                      </Row>
                    </Col>
                    <Col lg="5">
                      <div className="d-block position-relative">
                      {videoPath?.length===0?
                        <div className="form_video-upload">
                          <input
                            type="file"
                            accept="video/mp4,video/x-m4v,video/*"
                            name="content"
                            // value={state.content}
                            onChange={handleUploadChange}
                          />
                          <p>Upload video</p>
                        </div>
                        :
                        <div className="embed-responsive embed-responsive-4by3">
                        {/* <iframe className="embed-responsive-item" style={{height:"80%"}} title="iframe2" src={videoPath} allowFullScreen></iframe> */}
                        <video  className="video d-block"  style={{height:"80%"}} controls loop>
                          {console.log("videoPath====>",videoPath)}
              <source src={videoPath} type="video/mp4"/>
            </video>
                        <div className="d-flex">
                        <input
                            type="file"
                            accept="video/mp4,video/x-m4v,video/*"
                            name="content"
                            // value={state.content}
                            onChange={handleUploadChange}
                          />
                          <p>Updated video</p>
                          </div>
                     </div>}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <Row>
                        <Col sm="3" className="form-group">
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
                        </Col>
                        <Col sm="3" className="form-group">
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
                        </Col>
                        <Col sm="3" className="form-group">
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
                        </Col>
                        <Col sm="3" className="form-group">
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
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col sm="7" className="form-group">
                      <select
                        className="col-12 form-control"
                        id="exampleFormControlSelect3"
                      >
                        <option defaultValue disabled="">
                          Choose Owner
                        </option>
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Tamil</option>
                        <option>Gujarati</option>
                      </select>
                    </Col>
                  </Row> */}
                  <Row>
                   {isOwner===false? 
                  <Col sm="3" className="form-group">
                  <Select
                          onChange={handleselectedStaff}
                          placeholder={"Select Owner"}
                          required
                          menuPlacement={"auto"}
                          value={staffsOptions?.filter((obj) =>
                            obj.value===state.ownerId)}
                          options={staffsOptions}
                          classNamePrefix="select2-selection"
                          styles={customStyles}
                        />
                    </Col>:""}
                    <Col sm="3" className="col-6 form-group">
                      <Form.Control
                        type="number"
                        name="estimatedDuration"
                          value={state.estimatedDuration}
                          onChange={handleInputChange}
                        placeholder="Duration"
                      />
                    </Col>
                    <Col sm="3" className="form-group">
                          <select
                            className="form-control"
                            id="exampleFormControlSelect2"
                            name="paymentType"
                            value={state.paymentType}
                            onChange={handleInputChange}
                            required
                          >
                            <option>Choose payment type</option>
                            <option value="free">Free</option>
                            <option  value="payment">To Pay</option>
                          </select>
                        </Col>
                    <Col sm="3" className="col-6 form-group">
                      <Form.Control type="number" 
                      name="price"
                      value={state.price}
                      min={state.paymentType==="free"?0:1}
                      onChange={handleInputChange}
                      placeholder="price" 
                      disabled={state.paymentType==="free"?true:false}
                      required
                      />
                      
                    </Col>
                    <Form.Group className="col-12">
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
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EventForm;
