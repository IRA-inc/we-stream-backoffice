import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent, getAllstaffs, getAllCategories } from "../../actions";
import { CREATE_EVENT_LOADING_ID } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import EventForm from "../reusableComponents/forms/eventForm";

const AddEvent = () => {
  const [eventdata, setEvent] = useState({
    name: "",
    startingDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    type: "",
    estimatedDuration: "",
    ownerId: "",
    categoryId: "",
    price: 0,
    paymentType: "",
    description: "",
    special:"",
    privateLink:""
  });

  console.log("eventdata==>",eventdata)

  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(1);
  const [Errors, setErros] = useState("");
  const [imageResult, setFileResult] = useState("");
  const [videoPath, setVideoPath] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [imageFile, setImageFile] = useState("");
  const dispatch = useDispatch();
  const staffs = useSelector((state) => state.users.staffs);
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
    if (name === "type" && value === "live") {
      setEvent({
        ...eventdata,
        [name]: value,
        privateLink: "",
      });
      return;
    }
    if (name === "type" && value === "streaming") {
      setEvent({
        ...eventdata,
        [name]: value,
        privateLink: "",
      });
      return;
    }
    setEvent({
      ...eventdata,
      [name]: value,
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
          setVideoPath("");
          setVideoPath(URL.createObjectURL(files[0]));
          setVideoFile(files[0]);
          return;
        }
      };
    }
  };

  const handleselectedCategory = (selected) => {
    const selectedcategoryId = selected;
    console.log("selectedapprovalLevel===>", selectedcategoryId);
    setEvent({
      ...eventdata,
      categoryId: selectedcategoryId.value,
    });
  };

  const handleselectedStaff = (selected) => {
    const selectedStaff = selected;
    setEvent({
      ...eventdata,
      ownerId: selectedStaff.value,
    });
  };

  const changeSpecial = (value) => {
    console.log("===>",value)
      setEvent({
        ...eventdata,
      special:value,
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
    await dispatch(createEvent(formData));
  };

  useEffect(() => {
    dispatch(getAllstaffs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCategories({ search,page }));
  }, [dispatch,search,page]);

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
        isOwner={false}
        state={eventdata}
        videoFile={videoFile}
        imageFile={imageFile}
        imageResult={imageResult}
        isLoading={isLoading}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        changeSpecial={changeSpecial}
        show={show}
        setShow={setShow}
        Errors={Errors}
        categories={categories?.data?.objects}
        staffs={staffs?.data?.objects}
        videoPath={videoPath}
        handleUploadChange={handleUploadChange}
        handleselectedStaff={handleselectedStaff}
        handleselectedCategory={handleselectedCategory}
        message="Event created successfuly"
      />
    </>
  );
};
export default AddEvent;
