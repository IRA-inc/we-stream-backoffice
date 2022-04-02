import {
    DISPLAY_ALL_DATA,
    DISPLAY_ONE_DATA,
    DISPLAY_ALL_STAFF,
  } from '../actions';
  
  const initialState = {
    users: [],
    user: null,
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
      default:
        return state;
    }
  };
  
  
  
  
  
  
  
  