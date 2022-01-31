import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createRole } from "../../actions";
import { CREATE_ROLE_LOADING_ID } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import RoleForm from "../reusableComponents/forms/roleForm";

const AddRoles = () => {
  let history = useNavigate();
  const [role, setRole] = useState({
    name: "",
  });
  const [show, setShow] = useState(false);
  const [Errors, setErros] = useState("");
  const dispatch = useDispatch();
  const successMessage = useSelector((state) => state.ResponseMessage);
  const ErrorMessage = useSelector((state) => state.ErrorResponseMessage);
  const isLoading = useSelector(
    (state) => state?.loader[CREATE_ROLE_LOADING_ID]?.isLoading
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRole({
      ...role,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createRole(role));
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
        history("/role-list");
      }, 5000);
    }
  }, [ErrorMessage, successMessage, history]);

  return (
    <>
        <RoleForm
          title="Add Role"
          state={role}
          isLoading={isLoading}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          show={show}
          setShow={setShow}
          Errors={Errors}
          message="Role created successfuly"
        />
    </>
  );
};

export default AddRoles;
