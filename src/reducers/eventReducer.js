import {
    DISPLAY_ALL_DATA,
    DISPLAY_ONE_DATA,
  } from '../actions';
  
  const initialState = {
    events: [],
    event: null,
  };
  
  
  export const events = (state = initialState, action) => {
    switch (action.type) {
      case DISPLAY_ALL_DATA:
        return { ...state,events: action.payload };
      case DISPLAY_ONE_DATA:
          return { ...state,event: action.payload };  
      default:
        return state;
    }
  };
  
  
  
  
  
  
  
  