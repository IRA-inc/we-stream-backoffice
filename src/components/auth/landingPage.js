import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import {
  Container,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {camelizeKeys} from 'humps';
import jwtDecode from 'jwt-decode';

const LoginLanding = () => {
  const {REACT_APP_HOME_URL} = process.env;
  const { token }= useParams();

  const user = camelizeKeys(jwtDecode(token))
  sessionStorage.setItem("jwtToken", token);

  const history =useNavigate() 
  function redirect(){
    window.location = `${REACT_APP_HOME_URL}`;
    sessionStorage.removeItem("jwtToken");
  }

  useEffect(() => {
    if(isEmpty(user)===false){
      if(user?.role?.map((roles) => roles.name).includes("SUPERADMIN")){
        history("/dashboard")
        return
      }
        if(user?.role?.map((roles) => roles.name).includes("EVENTOWNER")){
        history("/mydashboard")
        return
      }
      else{
        redirect()
      }
    }
  }, [history,redirect,user]);

//   const parsedUrl = queryString.parse(location.search);
  return (
    <>
      <section className="sign-in-page">
        <Container>
        </Container>
      </section>
    </>
  );
}

export default LoginLanding;
