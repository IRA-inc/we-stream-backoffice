import {
    DISPLAY_ALL_MESSAGES,
    DISPLAY_ONE_MESSAGES,
  } from '../actions';
  
  const initialState = {
    messages: [],
    message: null,
  };
  
  
  export const messages = (state = initialState, action) => {
    switch (action.type) {
      case DISPLAY_ALL_MESSAGES:
        return { ...state,messages: action.payload };
      case DISPLAY_ONE_MESSAGES:
          return { ...state,message: action.payload };  
      default:
        return state;
    }
  };
  
  
  
  
  
  
  
  