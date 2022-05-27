import {
    DISPLAY_ALL_DATA,
    DISPLAY_ONE_DATA,
    DISPLAY_ALL_STAFF,
    DISPLAY_MY_PROFILE
  } from '../actions';
  
  const initialState = {
    users: [],
    user: null,
    userProfile: null,
    staffs:[],
  };
  
  
  export const users = (state = initialState, action) => {
    switch (action.type) {
      case DISPLAY_ALL_DATA:
        return { ...state,users: action.payload };
      case DISPLAY_ALL_STAFF:
          return { ...state,staffs: action.payload };  
      case DISPLAY_ONE_DATA:
          return { ...state,user: action.payload }; 
      case DISPLAY_MY_PROFILE:
            return { ...state,userProfile: action.payload };       
      default:
        return state;
    }
  };
  
  
  
  
  
  
  
  