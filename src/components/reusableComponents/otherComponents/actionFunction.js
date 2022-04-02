import Swal from "sweetalert2";

const actionFunction = (id,mainFunction,getAction,actionMessage,responseMessage,title,dispatch) => {
    // const {id,mainFunction,action,actionMessage,responseMessage,title,dispatch}=props;
    console.log("id",id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      color: "#ffffff",
      confirmButtonText: `Yes, ${actionMessage} it!`,
      background: "#141414",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(mainFunction({ id }));
        dispatch(getAction());
        Swal.fire({
          title: `${title}!`,
          text: `${responseMessage}.`,
          icon: "success",
          color: "#ffffff",
          background: "#141414",
        });
      }
    });
  };

  export default actionFunction