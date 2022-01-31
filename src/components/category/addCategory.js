import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../actions";
import { CREATE_CATEGORY_LOADING_ID } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import RoleForm from "../reusableComponents/forms/roleForm";

const AddCategory = () => {
  let history = useNavigate();
  const [category, setCategory] = useState({
    name: "",
  });

  const [show, setShow] = useState(false);
  const [Errors, setErros] = useState("");
  const dispatch = useDispatch();
  const successMessage = useSelector((state) => state.ResponseMessage);
  const ErrorMessage = useSelector((state) => state.ErrorResponseMessage);
  const isLoading = useSelector(
    (state) => state?.loader[CREATE_CATEGORY_LOADING_ID]?.isLoading
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createCategory(category));
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
        history("/category-list");
      }, 5000);
    }
  }, [ErrorMessage, successMessage, history]);

  console.log("state====>", category);

  return (
    <>
      <RoleForm
          title="Add Category"
          state={category}
          isLoading={isLoading}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          show={show}
          setShow={setShow}
          Errors={Errors}
          message="Category created successfuly"
        />
    </>
  );
};
export default AddCategory;
