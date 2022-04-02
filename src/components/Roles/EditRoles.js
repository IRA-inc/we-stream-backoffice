import React, { useState, useEffect } from "react";
import { EDIT_ROLE_LOADING_ID } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneRole, editRole } from "../../actions";
import RoleForm from "../reusableComponents/forms/roleForm";

const EditRole = (props) => {
  let history = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [Errors, setErros] = useState("");
  const roleData = useSelector((state) => state.Roles.role);
  const successMessage = useSelector((state) => state.ResponseMessage);
  const ErrorMessage = useSelector((state) => state.ErrorResponseMessage);
  const isLoading = useSelector(
    (state) => state?.loader[EDIT_ROLE_LOADING_ID]?.isLoading
  );

  const [role, setRole] = useState({
    name: "",
  });

  useEffect(() => {
    dispatch(getOneRole({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    setRole({
      name: roleData?.data?.name,
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
        history("/role-list");
      }, 5000);
    }
    // execute this
  }, [roleData, ErrorMessage, successMessage, history]); // when hotContact changes

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRole({
      ...role,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(editRole({ role, id }));
  };

  return (
    <>
      <RoleForm
        title="Edit Role"
        state={role}
        isLoading={isLoading}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        show={show}
        setShow={setShow}
        Errors={Errors}
        message="Changes saved successfuly"
      />
    </>
  );
};

export default EditRole;
