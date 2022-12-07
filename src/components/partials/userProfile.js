import React,{useState,useEffect} from 'react'
// import { Link,useSearchParams } from 'react-router-dom'
import { Col, Row, Container, Form } from 'react-bootstrap'
// import Choices from 'react-choices'

// Datepicker
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import userImage from '../../assets/images/user/2.jpg'
import UserForm from '../reusableComponents/forms/userForm';
// import PaywithMomoForm from "../payments/mobileSubscription";
// import PaywithCardForm from "../payments/subcription";
// import ActionModal from "../reusableComponents/modals/actionModal";
import { useSelector, useDispatch } from "react-redux";
import { editProfileAction,myProfileAction } from "../../actions";
import { EDIT_USER_LOADING_ID } from "../../constants";

const MyAccount = () => {
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        phoneNumber: "",
        gender: "",
      });
      const [show, setShow] = useState(false);
      const [Errors, setErros] = useState("");
      const [showMomo, setShowMomo] = useState(false);
      const [showCard, setShowCard] = useState(false);
      const dispatch = useDispatch();
      const userData = useSelector((state) => state.users.userProfile);
      const successMessage = useSelector((state) => state.ResponseMessage);
      const ErrorMessage = useSelector((state) => state.ErrorResponseMessage);
      const isLoading = useSelector(
        (state) => state?.loader[EDIT_USER_LOADING_ID]?.isLoading
      );
      // const [searchParams] = useSearchParams();
      // const status = searchParams.get("status");
      // const tx_ref = searchParams.get("tx_ref");
      // const transaction_id = searchParams.get("transaction_id");
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({
          ...user,
          [name]: value,
        });
      };
      const changeGender = (gender) => {
        setUser({
          ...user,
          gender: gender,
        });
      };

      const handlephoneNumberChange = (phoneNumber) => {
        setUser({
          ...user,
          phoneNumber: phoneNumber,
        });
      };
      
  useEffect(() => {
    dispatch(myProfileAction());
  }, [dispatch]);

  // useEffect(async() => {
  //   if (status !== null && tx_ref !== null && transaction_id !== null) {
  //     dispatch(
  //       verifyCardSubscription({
  //         status,
  //         tx_ref,
  //         transaction_id,
  //       })
  //     );
  //     // await window.location.reload(true);
  //   }
  // }, [dispatch]);

  useEffect(() => {
    setUser({
    name: userData?.data?.name,
    username: userData?.data.username,
    email:userData?.data?.email,
    phoneNumber: userData?.data?.phoneNumber,
    gender:userData?.data?.gender,
    });
    if (ErrorMessage && ErrorMessage.length > 0) {
      setErros(ErrorMessage);
      setShow(true);
    }
    if (successMessage && successMessage.length > 0) {
      setErros("");
      setShow(true);
      setTimeout(() => {
        setShow(false);
        // history("/user-list");
      }, 5000);
    }
  }, [userData,ErrorMessage, successMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editProfileAction({user}));
    await dispatch(myProfileAction());
  };

    return (
        <>
        <div className="main-content">
            <section className="m-profile manage-p">
            {/* <ActionModal
          show={showMomo}
          toggleModal={toggleMomoModal}
          Component={PaywithMomoForm}
          title="Subscription Payment"
        /> */}
        {/* <ActionModal
          show={showCard}
          toggleModal={toggleCardModal}
          Component={PaywithCardForm}
          title="Subscription Payment"
        /> */}
                <Container>
                    <Row className="row align-items-center justify-content-center h-100">
                        <Col lg="10">
                            <div className="sign-user_card">
                                <Row>
                                    <Col lg="2">
                                        <div className="upload_profile d-inline-block">
                                            <img src={userImage} className="profile-pic avatar-130 rounded-circle img-fluid" alt="user"/>
                                            <div className="p-image">
                                                <i className="ri-pencil-line upload-button"></i>
                                                <input className="file-upload" type="file" accept="image/*"/>
                                            </div>
                                        </div>
                                      </Col>
                                    <Col lg="10" className="device-margin">
                                    <UserForm 
                                    userProfile={true}
                                    title="Profile"
                                    state={user}
                                    isLoading={isLoading}
                                    handleInputChange={handleInputChange}
                                    handlephoneNumberChange={handlephoneNumberChange}
                                    handleSubmit={handleSubmit}
                                    show={show}
                                    setShow={setShow}
                                    Errors={Errors}
                                    // roles={roles?.data?.results}
                                    changeGender={changeGender}
                                    // toggleMomoModal={toggleMomoModal}
                                    // toggleCardModal={toggleCardModal}
                                    message="Changes saved successfuly"
                                    />
                                    
                                        {/* <div className="profile-from">
                                            <h4 className="mb-3">Manage Profile</h4>
                                            <Form className="mt-4" action="#">
                                                <Form.Group className="form-group">
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control type="text" className="form-control mb-0" id="exampleInputl2"
                                                        placeholder="Enter Your Name" autoComplete="off" required/>
                                                </Form.Group>
                                                <Form.Group className="form-group">
                                                    <Form.Label>Date of Birth</Form.Label>
                                                    <DatePicker selected={date}  dateFormat="yyyy/MM/dd" onChange={handleChange3} />
                                                </Form.Group>
                                                <Form.Group className="form-group d-flex flex-md-row flex-column">
                                                    <div className="iq-custom-select mr-2 mb-2">
                                                        <Select className="iq-size" id="f1" options={options1} />
                                                    </div>        
                                                    <div className="w-50 form1">
                                                        <Select
                                                            className="bgcollor "
                                                            placeholder="Language Preference"
                                                            value={data2.filter(obj => selectedValue.includes(obj.value))} // set selected values
                                                            options={data2} // set list of the data
                                                            onChange={handleChange} // assign onChange function
                                                            isMulti
                                                            isClearable
                                                        />
                                                    </div>
                                                </Form.Group>
                                                <div className="d-flex">
                                                    <Link to="#" className="btn btn-hover">Save</Link>
                                                    <Link to="#" className="btn btn-link">Cancel</Link>
                                                </div>
                                            </Form>
                                        </div> */}
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>          
            </section>
            </div>
        </>
    )
}

export default MyAccount