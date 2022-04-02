import {DISPLAY_ALL_DATA,DISPLAY_ONE_DATA,DISPLAY_ALL_STAFF} from './actionTypes'

export const displayData = () => {
    return {
      type: DISPLAY_ALL_DATA,
    };
  };

export const displayOneData = () => {
    return {
      type: DISPLAY_ONE_DATA,
    };
  }; 
  
  export const displayStaff = () => {
    return {
      type: DISPLAY_ALL_STAFF,
    };
  }; 

  export const AppStats = () => {
    return {
      type: DISPLAY_ALL_STAFF,
    };
  };   