import React, { useState, useEffect } from "react";
import { EDIT_CATEGORY_LOADING_ID } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneMessage, createMessage } from "../../actions";
import MessageForm from "../reusableComponents/forms/sendMessage";

const SendMessage = () => {
  let history = useNavigate();
  const { id } = useParams();
  const [messageData, setMessage] = useState({
    response: "",
  });
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [Errors, setErros] = useState("");
  const messages = useSelector((state) => state.messages.message);
  const successMessage = useSelector((state) => state.ResponseMessage);
  const ErrorMessage = useSelector((state) => state.ErrorResponseMessage);
  const isLoading = useSelector(
    (state) => state?.loader[EDIT_CATEGORY_LOADING_ID]?.isLoading
  );

  useEffect(() => {
    dispatch(getOneMessage({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    setMessage({
    message: messages?.Msg?.name,
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
        history("/messages");
      }, 5000);
    }
    // execute this
  }, [ErrorMessage, successMessage, history]); // when hotContact changes

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMessage({
      ...messageData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createMessage({ messageData, id }));
  };

//   console.log("state====>", categoryData);

  return (
    <>
      <>
        <MessageForm
          title="Reply Message"
          state={messageData}
          messages={messages}
          isLoading={isLoading}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          show={show}
          setShow={setShow}
          Errors={Errors}
          message="Changes saved successfuly"
        />
      </>
    </>
  );
};
export default SendMessage;
