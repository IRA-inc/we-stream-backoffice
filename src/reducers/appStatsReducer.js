import {
  DISPLAY_TOP_FIVE,
  DISPLAY_MY_TOP_FIVE,
  DISPLAY_ALL_USERS_CATEGORY,
  DISPLAY_ALL_EVENTS_CATEGORY,
  DISPLAY_APP_STATS,
  DISPLAY_MY_STATS
} from "../actions";

const initialState = {
  appStats: null,
  ownerStats: null,
  topFiveEvents: [],
  myTopFiveEvents: [],
  usersCategories: [],
  eventsCategories: [],
};

export const appStatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_APP_STATS:
      return { ...state, appStats: action.payload };
    case DISPLAY_MY_STATS:
      return { ...state, ownerStats: action.payload };
    case DISPLAY_TOP_FIVE:
      return { ...state, topFiveEvents: action.payload };
    case DISPLAY_MY_TOP_FIVE:
      return { ...state, myTopFiveEvents: action.payload };
    case DISPLAY_ALL_USERS_CATEGORY:
      return { ...state, usersCategories: action.payload };
    case DISPLAY_ALL_EVENTS_CATEGORY:
        return { ...state, eventsCategories: action.payload };
    default:
      return state;
  }
};
