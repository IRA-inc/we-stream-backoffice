import React, { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { editUser,getOneUser,getAllRoles } from "../../actions";
import { EDIT_USER_LOADING_ID } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import UserForm from "../reusableComponents/forms/userForm";

const EditUser = () => {
  let history = useNavigate();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    role: [],
    gender: "",
    approvalLevel: [],
  });
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(1);
  const [Errors, setErros] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.user);
  const roles = useSelector((state) => state.Roles.roles);
  const successMessage = useSelector((state) => state.ResponseMessage);
  const ErrorMessage = useSelector((state) => state.ErrorResponseMessage);
  const isLoading = useSelector(
    (state) => state?.loader[EDIT_USER_LOADING_ID]?.isLoading
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

  console.log('user',user?.password)
  console.log("selectedapprovalLevel===>",userData?.data)

  const handleselectedUserRoles = (selected) => {
    const selectedRoles = selected || [];
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
    await dispatch(editUser({user,id}));
  };
  
  useEffect(() => {
    dispatch(getAllRoles({ search, page }));
  }, [dispatch, search, page]);

  useEffect(() => {
    dispatch(getOneUser({ id }));
  }, [dispatch,id]);

  useEffect(() => {
    setUser({
    name: userData?.data?.name,
    username: userData?.data.username,
    email:userData?.data?.email,
    phoneNumber: userData?.data?.phoneNumber,
    role: userData?.data?.role.map((roleData)=>roleData?._id),
    gender:userData?.data?.gender,
    approvalLevel: userData?.data?.approvalLevel,
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
        history("/user-list");
      }, 5000);
    }
  }, [userData,ErrorMessage, successMessage, history]);

  return (
    <>
      <UserForm
          title="Edit user"
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
          message="Changes saved successfuly"
        />
    </>
  );
};
export default EditUser;
