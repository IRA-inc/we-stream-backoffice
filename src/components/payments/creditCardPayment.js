import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import Card from "../../../components/Card";
import ButtonLoader from "../reusableComponents/Loaders/buttonLoader";
import responseComponent from "../../helpers/responseComponent";
import PaymentForm from "../reusableComponents/forms/paymentForm";
import { getOneEvent, myProfileAction, payWithCards } from "../../actions";
import { PAY_WITH_CARD_LOADING_ID } from "../../constants";
import { useSelector, useDispatch } from "react-redux";

const { ErrorResponse, SuccessResponse } = responseComponent;

const PaywithCardForm = (props) => {
  const { toggleModal, formData } = props;
  const [show, setShow] = useState(false);
  const [Errors, setErros] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    amount:5000
  });
  const dispatch = useDispatch();
  // const event = useSelector((state) => state.events.event);
  const userData = useSelector((state) => state.users.userProfile);
  const momoPaymentResponse = useSelector((state) => state.events.payment);
  const successMessage = useSelector((state) => state.ResponseMessage);
  const ErrorMessage = useSelector((state) => state.ErrorResponseMessage);

  console.log('momoPaymentResponse==>',momoPaymentResponse);
  // console.log('event==>',event);

  const isloading = useSelector(
    (state) => state?.loader[PAY_WITH_CARD_LOADING_ID]?.isLoading
  );

  useEffect(() => {
    dispatch(myProfileAction());
  }, [dispatch]);

  useEffect(() => {
    setUser({
      amount: 5000,
      name: userData?.data?.name,
      email:userData?.data?.email,
      phoneNumber: userData?.data?.phoneNumber,
      eventId: formData?.data._id,
    });
  }, [userData,formData]);

  useEffect(() => {
    // dispatch(getAllRoles());
    if (ErrorMessage && ErrorMessage.length > 0) {
      setErros(ErrorMessage);
      setShow(true);
    }
    if (successMessage && successMessage.length > 0) {
      setErros("");
      setShow(true);
      setTimeout(() => {
        setShow(false);
        // history("/event-list");
      }, 5000);
    }
  }, [ErrorMessage, successMessage]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    console.log('user==>', user)
    e.preventDefault();
    console.log('user==>', user)
    await dispatch(payWithCards(user));
  };

  return (
    <>
      <PaymentForm
        title="Pay with Visa or Credit card"
        isCard={true}
        toggleModal={toggleModal}
        state={user}
        ButtonLoader={ButtonLoader}
        amount={500000}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        message="payment done successfully"
        responseMessage={momoPaymentResponse}
        show={show}
        setShow={setShow}
        Errors={Errors}
        isLoading={isloading}
      />
    </>
  );
};

export default PaywithCardForm;
