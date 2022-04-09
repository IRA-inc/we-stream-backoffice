import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import Card from "../../../components/Card";
import ButtonLoader from "../reusableComponents/Loaders/buttonLoader";
import responseComponent from "../../helpers/responseComponent";
import PaymentForm from "../reusableComponents/forms/paymentForm";
import { getOneEvent, myProfileAction, payWithMomo } from "../../actions";
import {
  MY_PROFILE_LOADING_ID,
  PAY_WITH_MOMO_LOADING_ID,
} from "../../constants";
import { useSelector, useDispatch } from "react-redux";
// import { getUserId } from "../../../helpers/helperFunction";

const { ErrorResponse, SuccessResponse } = responseComponent;

const PaywithMomoForm = (props) => {
  const { toggleModal, formData } = props;
  // const [show, setShow] = useState(true);
  const [show, setShow] = useState(false);
  const [Errors, setErros] = useState("");
  const [paymentData, setPaymentData] = useState({
    amount: 500000,
    phoneNumber: "",
    eventId: "",
  });

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userProfile);
  console.log('userData==>',userData)
  // const momoPaymentResponse = useSelector((state) => state.payments.payment);
  const successMessage = useSelector((state) => state.ResponseMessage);
  const ErrorMessage = useSelector((state) => state.ErrorResponseMessage);

  const isloading = useSelector(
    (state) => state?.loader[PAY_WITH_MOMO_LOADING_ID]?.isLoading
  );

  useEffect(() => {
    dispatch(myProfileAction());
  }, [dispatch]);

  useEffect(() => {
    if(userData){
    setPaymentData({
      amount: 5000,
      name: userData?.data?.name,
      email:userData?.data?.email,
      phoneNumber: userData?.data?.phoneNumber,
      eventId: formData?.data._id,
    });
  }
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
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    console.log('user==>', paymentData)
    e.preventDefault();
    await dispatch(
      payWithMomo(paymentData)
    );
  };
console.log("formData===>",paymentData)
  return (
    <>
      <PaymentForm
        title="Pay with mobile money"
        isCard={false}
        toggleModal={toggleModal}
        state={paymentData}
        ButtonLoader={ButtonLoader}
        // amount={event?.data?.price}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        message="payment done successfuly"
        // responseMessage={momoPaymentResponse}
        show={show}
        setShow={setShow}
        Errors={Errors}
        isLoading={isloading}
      />
    </>
  );
};

export default PaywithMomoForm;
