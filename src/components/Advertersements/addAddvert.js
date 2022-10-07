import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAdd } from "../../actions";
import { CREATE_ADD_LOADING_ID } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import AddForm from "../reusableComponents/forms/addsForm";

const AddAdvert = () => {
  let history = useNavigate();
  const [add, setRole] = useState({
    company: "",
    startingDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    place: "",
    amount: 0,
  });
  const [show, setShow] = useState(false);
  const [Errors, setErros] = useState("");
  const [imageResult, setFileResult] = useState("");
  const [imageFile, setImageFile] = useState("");
  const dispatch = useDispatch();
  const successMessage = useSelector((state) => state.ResponseMessage);
  const ErrorMessage = useSelector((state) => state.ErrorResponseMessage);
  const isLoading = useSelector(
    (state) => state?.loader[CREATE_ADD_LOADING_ID]?.isLoading
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRole({
      ...add,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (imageFile !== "") {
      formData.append("file", imageFile);
    }
    for (const key in add) {
      if (add.hasOwnProperty(key)) {
        formData.append(key, add[key]);
      }
    }
    await dispatch(createAdd(formData));
  };

  const handleUploadChange = (e) => {
    const { name, files } = e.target;
    const fileTypes = [
      "image/gif",
      "image/jpeg",
      "image/pjpeg",
      "image/x-png",
      "image/png",
      "image/svg+xml",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/pdf",
    ];

    if (files && files.length > 0) {
      // for (let i = 0; i < files.length; i++) {
      //     if(Number(files[i].size)>5000000){
      //         toastr.error('file size is big, upload file size which is not greater than 5MB')
      //         return
      //         }
      // if(fileTypes.includes(files[i].type)===false){
      //     toastr.error('file type not allwoed, upload Image, PDF, Microsoft Word and Microsoft Word (OpenXML) files only')
      //     return
      //     }
      //   }
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        if (name === "file") {
          setFileResult(reader.result);
          setImageFile(files[0]);
          return;
        }
        // if (name === "content") {
        //   setVideoPath("");
        //   setVideoPath(URL.createObjectURL(files[0]));
        //   setVideoFile(files[0]);
        //   return;
        // }
      };
    }
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
        history("/addvert-list");
      }, 5000);
    }
  }, [ErrorMessage, successMessage, history]);

  return (
    <>
        <AddForm
          title="Add Advert"
          state={add}
          isLoading={isLoading}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          imageFile={imageFile}
          imageResult={imageResult}
          handleUploadChange={handleUploadChange}
          show={show}
          setShow={setShow}
          Errors={Errors}
          message="adds created successfuly"
        />
    </>
  );
};

export default AddAdvert;
