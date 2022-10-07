import {
  DISPLAY_ALL_CATEGORIES,
  DISPLAY_ONE_DATA,
} from '../actions';

const initialState = {
  categories: [],
  category: null,
};


export const categories = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_ALL_CATEGORIES:
      return { ...state,categories: action.payload };
    case DISPLAY_ONE_DATA:
        return { ...state,category: action.payload };  
    default:
      return state;
  }
};







