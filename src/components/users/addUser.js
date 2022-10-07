import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUser,getAllRoles } from "../../actions";
import { CREATE_USER_LOADING_ID } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import UserForm from "../reusableComponents/forms/userForm";

const AddUser = () => {
  let history = useNavigate();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: [],
    gender: "",
    approvalLevel: [],
  });

  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(1);
  const [Errors, setErros] = useState("");
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.Roles.roles);
  const successMessage = useSelector((state) => state.ResponseMessage);
  const ErrorMessage = useSelector((state) => state.ErrorResponseMessage);
  const isLoading = useSelector(
    (state) => state?.loader[CREATE_USER_LOADING_ID]?.isLoading
  );

  
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

  console.log('user',user.role)

  const handleselectedUserRoles = (selected) => {
    const selectedRoles = selected || [];
    console.log("selectedapprovalLevel===>",selectedRoles)
    const selectedUserRoles = selectedRoles.map(
      (option) => option.value
    );
    setUser({
      ...user,
      role: selectedUserRoles,
    });
  }

  const handleselectedApprovalLevel = (selected) => {
    const selectedapprovalLevel = selected || [];
   
    const selectedUserLevel = selectedapprovalLevel.map(
      (option) => option.value
    );
    setUser({
      ...user,
      approvalLevel: selectedUserLevel,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createUser(user));
  };
 

  useEffect(() => {
    dispatch(getAllRoles({ search, page }));
  }, [dispatch, search, page]);

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
        history("/user-list");
      }, 5000);
    }
  }, [ErrorMessage, successMessage, history]);

  return (
    <>
      <UserForm
          title="Add user"
          state={user}
          isLoading={isLoading}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          show={show}
          setShow={setShow}
          Errors={Errors}
          roles={roles?.data?.objects}
          changeGender={changeGender}
          handleselectedApprovalLevel={handleselectedApprovalLevel}
          handleselectedUserRoles={handleselectedUserRoles}
          message="User created successfuly"
        />
    </>
  );
};
export default AddUser;
