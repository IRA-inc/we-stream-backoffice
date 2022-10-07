import {
    DISPLAY_ALL_DATA,
    DISPLAY_ONE_DATA,
  } from '../actions';
  
  const initialState = {
    adverts: [],
    advert: null,
  };
  
  
  export const advertesments = (state = initialState, action) => {
    switch (action.type) {
      case DISPLAY_ALL_DATA:
        return { ...state,adverts: action.payload };
      case DISPLAY_ONE_DATA:
          return { ...state,advert: action.payload };  
      default:
        return state;
    }
  };
  
  
  
  
  
  
  
  
  