import React, { useState, useEffect } from "react";
import { EDIT_CATEGORY_LOADING_ID } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneCategory, editCategory } from "../../actions";
import RoleForm from "../reusableComponents/forms/roleForm";

const EditCategory = () => {
  let history = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState({
    name: "",
  });
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [Errors, setErros] = useState("");
  const categoryData = useSelector((state) => state.categories.category);
  const successMessage = useSelector((state) => state.ResponseMessage);
  const ErrorMessage = useSelector((state) => state.ErrorResponseMessage);
  const isLoading = useSelector(
    (state) => state?.loader[EDIT_CATEGORY_LOADING_ID]?.isLoading
  );

  useEffect(() => {
    dispatch(getOneCategory({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    setCategory({
      name: categoryData?.data?.name,
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
        history("/category-list");
      }, 5000);
    }
    // execute this
  }, [categoryData, ErrorMessage, successMessage, history]); // when hotContact changes

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(editCategory({ category, id }));
  };

  console.log("state====>", categoryData);

  return (
    <>
      <>
        <RoleForm
          title="Edit Category"
          state={category}
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
export default EditCategory;
