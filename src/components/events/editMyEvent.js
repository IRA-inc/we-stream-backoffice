import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ownerEditEvent, getAllCategories, getOneEvent } from "../../actions";
import { CREATE_EVENT_LOADING_ID } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import EventForm from "../reusableComponents/forms/eventForm";

const OwnerEditEvent = () => {
  const { id } = useParams();
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
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(1);
  const [streamingKey, setStreamingKey] = useState("");
  const [imageResult, setFileResult] = useState("");
  const [videoPath, setVideoPath] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [imageFile, setImageFile] = useState("");
  const dispatch = useDispatch();
  const event = useSelector((state) => state.events.event);
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

  const handleUploadChange = (e) => {
    const { name, files } = e.target;
    // const fileTypes = [
    //   "image/gif",
    //   "image/jpeg",
    //   "image/pjpeg",
    //   "image/x-png",
    //   "image/png",
    //   "image/svg+xml",
    //   "application/msword",
    //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    //   "application/pdf",
    // ];

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

  const changeSpecial = (value) => {
    setEvent({
      ...eventdata,
    special:value,
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const form = new FormData();
    // if (eventdata.file) {
    //   form.append('file', eventdata.file);
    // }

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
    //    for (let [key, value] of formData.entries()) {
    //   console.log("saga2=====>",key, value);
    // }

    await dispatch(ownerEditEvent({ formData, id }));
  };

  useEffect(() => {
    dispatch(getAllCategories({ search,page }));
  }, [dispatch,search,page]);


  useEffect(() => {
    dispatch(getOneEvent({ id }));
  }, [dispatch, id]);
  

  useEffect(() => {
    if (event) {
      setEvent({
        name: event?.data?.name,
        startingDate: event?.data?.startingDate,
        endDate: event?.data?.endDate,
        startTime: event?.data?.startTime,
        endTime: event?.data?.endTime,
        type: event?.data?.type,
        estimatedDuration: event?.data?.estimatedDuration,
        categoryId: event?.data?.categoryId._id,
        price: event?.data?.price,
        paymentType: event?.data?.paymentType,
        description: event?.data?.description,
        special:event?.data?.special,
      });
      setVideoPath(event?.data?.content)
      setStreamingKey(event?.data?.streamingKey)
    }
    if (ErrorMessage && ErrorMessage.length > 0) {
      setErros(ErrorMessage);
      setShow(true);
    }
    if (successMessage && successMessage.length > 0) {
      setErros("");
      setShow(true);
      setTimeout(() => {
        setShow(false);
        history("/my-events");
      }, 5000);
    }
  }, [ErrorMessage, successMessage, event, history]);

  const copyTextx=()=> {
    /* Get the text field */
   var copyText = document.getElementById("streamingKey");
 
   /* Select the text field */
   copyText.select();
   copyText.setSelectionRange(0, 99999); /* For mobile devices */
    /* Copy the text inside the text field */
   navigator.clipboard.writeText(copyText.value);
   }
  
  return (
    
    <>
      <EventForm
        title="Edit Event"
        isOwner={true}
        state={eventdata}
        streamkey={streamingKey}
        status={event?.data?.status}
        videoFile={videoFile}
        imageResult={imageResult}
        imageFile={imageFile}
        isLoading={isLoading}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        show={show}
        copyTextx={copyTextx}
        setShow={setShow}
        Errors={Errors}
        categories={categories?.data?.objects}
        videoPath={videoPath}
        handleUploadChange={handleUploadChange}
        changeSpecial={changeSpecial}
        handleselectedCategory={handleselectedCategory}
        message="Change saved succefully"
      />
    </>
  );
};
export default OwnerEditEvent;
