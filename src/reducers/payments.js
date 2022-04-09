import {
    DISPLAY_ALL_DATA,
    DISPLAY_ONE_DATA,
  } from '../actions';
  
  const initialState = {
    payments: [],
    mypayments: [],
  };
  
  
  export const payments = (state = initialState, action) => {
    switch (action.type) {
      case DISPLAY_ALL_DATA:
        return { ...state,payments: action.payload };
      case DISPLAY_ONE_DATA:
          return { ...state,mypayments: action.payload };  
      default:
        return state;
    }
  };
  
  
  
  
  
  
  
  
  