import {
    DISPLAY_NOTIFICATIONS
  } from '../actions';
  
  const initialState = {
    notifications: [],
  };
  
  
  export const notifications = (state = initialState, action) => {
    switch (action.type) {
      case DISPLAY_NOTIFICATIONS:
        return { ...state,notifications: action.payload };
      default:
        return state;
    }
  };
  
  
  
  
  
  
  
  