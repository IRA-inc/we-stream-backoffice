import { Alert } from "react-bootstrap";

const ErrorResponse = (props) => {
  const { Error, show, setShow } = props;
  if (Error?.message === "jwt malformed" || Error?.message === "jwt expired") {
    console.log("message===>", Error?.message);
    return (
      <Alert variant="text-white bg-primary col-6" show={show}>
        <div className="iq-alert-text">Please Login</div>
        <button type="button" className="close" onClick={() => setShow(false)}>
          <i className="ri-close-line"></i>
        </button>
      </Alert>
    );
  } else {
    console.log("message2===>", Array.isArray(Error));

    if (Array.isArray(Error) === true) {
      console.log("message1===>", Array.isArray(Error));
      return (
        <>
          {Error.map((error, index) => (
            <Alert
              variant="text-white bg-primary col-6"
              key={index}
              show={show}
            >
              <div className="iq-alert-text">{error}</div>
              <button
                type="button"
                className="close"
                onClick={() => setShow(false)}
              >
                <i className="ri-close-line"></i>
              </button>
            </Alert>
          ))}
        </>
      );
    } else {
      console.log("message2===>", Array.isArray(Error));
      return (
        <Alert variant="text-white bg-primary col-6" show={show}>
          <div className="iq-alert-text">{Error}</div>
          <button
            type="button"
            className="close"
            onClick={() => setShow(false)}
          >
            <i className="ri-close-line"></i>
          </button>
        </Alert>
      );
    }
  }
};

const SuccessResponse = (props) => {
  const { message, show, setShow } = props;
  return (
    <>
      <Alert variant="text-white bg-success col-6" show={show}>
        <div className="iq-alert-text">{message}</div>
        <button type="button" className="close" onClick={() => setShow(false)}>
          <i className="ri-close-line"></i>
        </button>
      </Alert>
    </>
  );
};

export default { ErrorResponse, SuccessResponse };
