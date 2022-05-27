import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addPayments } from "../../actions";
import { ADD_PAYMENT_LOADING_ID } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import PayoutForm from "../reusableComponents/forms/paymentForms";

const AddPayment = () => {
  let history = useNavigate();
  const { id } = useParams();
  const [payment, setPayment] = useState({
    transaction_id: "",
    amount:"",
    eventId:id
  });

  const [show, setShow] = useState(false);
  const [Errors, setErros] = useState("");
  const dispatch = useDispatch();
  const successMessage = useSelector((state) => state.ResponseMessage);
  const ErrorMessage = useSelector((state) => state.ErrorResponseMessage);
  const isLoading = useSelector(
    (state) => state?.loader[ADD_PAYMENT_LOADING_ID]?.isLoading
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPayment({
      ...payment,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addPayments(payment));
    console.log("state====>", payment);
  };

  useEffect(() => {
    if (ErrorMessage && ErrorMessage.length > 0) {
      setErros(ErrorMessage);
      setShow(true);
    }
    if (successMessage && successMessage.length > 0) {
      setErros("");
      setShow(true);
      setTimeout(() => {
        setShow(false);
        history("/payout-events");
      }, 5000);
    }
  }, [ErrorMessage, successMessage, history]);

  return (
    <>
      <PayoutForm
          title="Add Payment"
          state={payment}
          isLoading={isLoading}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          show={show}
          setShow={setShow}
          Errors={Errors}
          message="Payment done successfuly"
        />
    </>
  );
};
export default AddPayment;
