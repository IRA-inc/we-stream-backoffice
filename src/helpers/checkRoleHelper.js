import {camelizeKeys} from 'humps';
import jwtDecode from 'jwt-decode';



const isAuthenticated = () => {
   const {jwtToken} = sessionStorage;
   const user = camelizeKeys(jwtDecode(jwtToken));
    try {
      if (user === null) return false;
      return user
    } catch (err) {
      return false;
    }
  };

export const checkSuperAdminRole = () => {
  const userinfor= isAuthenticated()  
  const { role } = userinfor;
  if (!role?.map((roles) => roles.name).includes("SUPERADMIN")) {
    return false
  }
  return true;
};

export const checkEventOwnerRole = () => {
  const userinfor= isAuthenticated() 
  const { role } = userinfor;
  if (!role.map((roles) => roles.name).includes("EVENTOWNER")) {
    return false
  }
  return true;
};

export const checkAdminRole = () => {
  const userinfor= isAuthenticated()   
  const { role } = userinfor;
  if (
    role.map((roles) => roles.name).includes("SUPERADMIN") === false &&
    role.map((roles) => roles.name).includes("ADMIN") === false
  ) {
    return false
  }
  return true;
};
