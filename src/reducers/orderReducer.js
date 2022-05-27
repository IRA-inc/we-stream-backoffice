import {
    DISPLAY_ALL_DATA,
    DISPLAY_ONE_DATA,
    DISPLAY_ALL_ORDERS,
  } from '../actions';
  
  const initialState = {
    orders: [],
    event: null,
  };
  
  
  export const orders = (state = initialState, action) => {
    switch (action.type) {
      case DISPLAY_ALL_ORDERS:
        return { ...state,orders: action.payload };
      case DISPLAY_ONE_DATA:
          return { ...state,event: action.payload };  
      default:
        return state;
    }
  };
  
  
  
  
  
  
  
  