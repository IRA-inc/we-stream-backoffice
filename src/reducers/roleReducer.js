import {
  DISPLAY_ALL_DATA,
  DISPLAY_ONE_DATA,
} from '../actions';

const initialState = {
  roles: [],
  role: null,
};


export const Roles = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_ALL_DATA:
      return { ...state,roles: action.payload };
    case DISPLAY_ONE_DATA:
        return { ...state,role: action.payload };  
    default:
      return state;
  }
};








