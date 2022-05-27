import {
    DISPLAY_ALL_DATA,
    DISPLAY_ONE_DATA,
    SET_PAYMENT_RESPONSE,
  } from '../actions';
  
  const initialState = {
    events: [],
    event: null,
    payment: null,
  };
  
  
  export const events = (state = initialState, action) => {
    switch (action.type) {
      case DISPLAY_ALL_DATA:
        return { ...state,events: action.payload };
      case DISPLAY_ONE_DATA:
          return { ...state,event: action.payload };  
      case SET_PAYMENT_RESPONSE:
            return { ...state, payment: action.payload };    
      default:
        return state;
    }
  };
  
  
  
  
  
  
  
  