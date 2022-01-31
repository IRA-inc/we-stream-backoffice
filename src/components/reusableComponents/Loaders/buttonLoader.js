import React from "react";
import {Bars} from "react-loader-spinner";

const ButtonLoader =()=> {
  return (
    <div>
      <Bars
        color="#FFFFFF"
        height={20}
        width={50}
        // timeout={15000} // 3 secs
      />
    </div>
  );
};

export default ButtonLoader;
