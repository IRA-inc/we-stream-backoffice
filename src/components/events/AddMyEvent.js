import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ownerCreateEvent, getAllCategories } from "../../actions";
import { CREATE_EVENT_LOADING_ID } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import EventForm from "../reusableComponents/forms/eventForm";

const AddMyEvent = () => {
  const [eventdata, setEvent] = useState({
    name: "",
    startingDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    type: "",
    estimatedDuration: "",
    categoryId: "",
    price: 0,
    paymentType: "",
    description: "",
    special:false,
  });

  const [show, setShow] = useState(false);
  const [Errors, setErros] = useState("");
  const [ImageResult, setFileResult] = useState("");
  const [videoPath, setVideoPath] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [imageFile, setImageFile] = useState("");
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const successMessage = useSelector((state) => state.ResponseMessage);
  const ErrorMessage = useSelector((state) => state.ErrorResponseMessage);
  const isLoading = useSelector(
    (state) => state?.loader[CREATE_EVENT_LOADING_ID]?.isLoading
  );
  let history = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "paymentType" && value === "free") {
      setEvent({
        ...eventdata,
        [name]: value,
        price: 0,
      });
      return;
    }
    setEvent({
      ...eventdata,
      [name]: value,
    });
  };

  const changeSpecial = (value) => {
    setEvent({
      ...eventdata,
    special:value,
  });
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
        if (name === "content") {
          setVideoPath(URL.createObjectURL(files[0]));
          setVideoFile(files[0]);
          return;
        }
      };
    }
  };

  const handleselectedCategory = (selected) => {
    const selectedcategoryId = selected;
    setEvent({
      ...eventdata,
      categoryId: selectedcategoryId.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (imageFile !== "") {
      formData.append("file", imageFile);
    }
    if (videoFile !== "") {
      formData.append("content", videoFile);
    }
    for (const key in eventdata) {
      if (eventdata.hasOwnProperty(key)) {
        formData.append(key, eventdata[key]);
      }
    }
    await dispatch(ownerCreateEvent(formData));
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

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
        history("/event-list");
      }, 5000);
    }
  }, [ErrorMessage, successMessage, history]);
  return (
    <>
      <EventForm
        title="Add Event"
        isOwner={true}
        state={eventdata}
        videoFile={videoFile}
        imageFile={imageFile}
        isLoading={isLoading}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        show={show}
        setShow={setShow}
        Errors={Errors}
        categories={categories?.data?.results}
        videoPath={videoPath}
        handleUploadChange={handleUploadChange}
        changeSpecial={changeSpecial}
        handleselectedCategory={handleselectedCategory}
        message="Event created successfuly"
      />
    </>
  );
};
export default AddMyEvent;
