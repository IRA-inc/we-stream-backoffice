import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Card from "../../../components/Card";
import ButtonLoader from "../../reusableComponents/Loaders/buttonLoader";
import responseComponent from "../../../helpers/responseComponent";
import Select from "react-select";

const { ErrorResponse, SuccessResponse } = responseComponent;

const UserForm = (props) => {
  const {
    state,
    handleInputChange,
    handleSubmit,
    isLoading,
    show,
    setShow,
    Errors,
    title,
    handleselectedApprovalLevel,
    handleselectedUserRoles,
    roles, 
    message,
    changeGender,
  } = props;

  const approvalLevels = [
    { value: "technical", label: "Technical" },
    { value: "finance", label: "Finance" },
    { value: "business", label: "Business" },
    { value: "forum_approver", label: "Forum Approver" },
    { value: "none", label: "None" },
  ];

  console.log('level====>',state?.role)

  const rolesOptions = roles?.map((role) => ({
		value: `${role._id}`,
		label: `${role.name}`,
	}));

  const customStyles = {
    menu: (base) => ({
      ...base,
      background: "#141414",
    }),
    placeholder: base => ({
      ...base,
      color:"white"
    }),
    // menuList: base => ({
    //   ...base,
    //   // kill the white space on first and last option
    //   padding: 0
    // }),
    option: (base, state) => ({
      ...base,
      color:state.isFocused ? "black" : "white",
      // kill the white space on first and last option
      padding: 0
    })
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
                <Row>
                  <Col lg="12">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="name"
                          value={state?.name}
                          onChange={handleInputChange}
                          placeholder="Name"
                          required
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="username"
                          value={state?.username}
                          onChange={handleInputChange}
                          placeholder="User name"
                          required
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          type="email"
                          id="email1"
                          name="email"
                          value={state?.email}
                          onChange={handleInputChange}
                          placeholder="email"
                          required
                        />
                      </Form.Group>
                      {state?.password!==undefined&&
                      <Form.Group className="form-group">
                        <Form.Control
                          type="password"
                          name="password"
                          value={state?.password}
                          onChange={handleInputChange}
                          placeholder="Password"
                          id="pwd"
                          required
                        />
                      </Form.Group>
}
                      <Form.Group className="form-group">
                        <Form.Control
                          type="tel"
                          id="exampleInputphone"
                          name="phoneNumber"
                          value={state?.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="phone number"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Select
                          isMulti
                          onChange={handleselectedUserRoles}
                          placeholder={"Select role"}
                          required
                          menuPlacement={"auto"}
                          value={rolesOptions?.filter((obj) =>
                            state?.role?.includes(obj.value)
                          )}
                          options={rolesOptions}
                          classNamePrefix="select2-selection"
                          styles={customStyles}
                        />
                      </Form.Group>
<Form.Group>
    
                        <Select
                          isMulti
                          onChange={handleselectedApprovalLevel}
                          placeholder={"Select approvel Level"}
                          required
                          menuPlacement={"auto"}
                          value={approvalLevels?.filter((obj) =>
                            state?.approvalLevel?.includes(obj.value)
                          )}
                          options={approvalLevels}
                          classNamePrefix="select2-selection"
                          styles={customStyles}
                        />
                      </Form.Group>                      
                      <Form.Group className="radio-box">
                        <label>Gender</label>
                        <div className="radio-btn">
                          <div className="custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id="customRadio6"
                              name="customRadio-1"
                              checked={state?.gender==="Male"?true:false}
                              value={state?.gender}
                              onChange={() => changeGender("Male")}
                              className="custom-control-input"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadio6"
                            >
                              Male
                            </label>
                          </div>
                          <div className="custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id="customRadio7"
                              name="customRadio-1"
                              checked={state?.gender==="Female"?true:false}
                              value={state?.gender}
                              onChange={() => changeGender("Female")}
                              className="custom-control-input"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadio7"
                            >
                              Female{" "}
                            </label>
                          </div>
                        </div>
                      </Form.Group>
                      <Form.Group className="form-group">
                        {Errors?.length > 0 ? (
                          <ErrorResponse
                            Error={Errors}
                            show={show}
                            setShow={setShow}
                          />
                        ) : (
                          ""
                        )}
                        {Errors?.length === 0 && show === true ? (
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

export default UserForm;
