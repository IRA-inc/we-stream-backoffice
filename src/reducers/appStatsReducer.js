import {
    DISPLAY_ALL_DATA,
    DISPLAY_ONE_DATA,
  } from '../actions';
  
  const initialState = {
    appStats: null,
    ownerStats:null,
  };
  
  
  export const appStatsReducer = (state = initialState, action) => {
    switch (action.type) {
      case DISPLAY_ONE_DATA:
          return { ...state,appStats: action.payload };
      case DISPLAY_ALL_DATA:
            return { ...state,ownerStats: action.payload };     
      default:
        return state;
    }
  };
  
  
  
  
  
  
  
  