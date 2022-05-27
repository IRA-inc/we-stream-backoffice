import {DISPLAY_ALL_DATA,DISPLAY_ONE_DATA,DISPLAY_ALL_STAFF,DISPLAY_ALL_ORDERS,DISPLAY_TOP_FIVE,DISPLAY_ALL_USERS_CATEGORY,DISPLAY_APP_STATS,DISPLAY_MY_STATS,DISPLAY_ALL_EVENTS_CATEGORY,DISPLAY_NOTIFICATIONS} from './actionTypes'

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
  
  export const orderDisplay = () => {
    return {
      type: DISPLAY_ALL_ORDERS,
    };
  }; 

  export const topFiveDisplay = () => {
    return {
      type: DISPLAY_TOP_FIVE,
    };
  };
  
  export const appStatsDisplay = () => {
    return {
      type: DISPLAY_APP_STATS,
    };
  };

  export const myStatsDisplay = () => {
    return {
      type: DISPLAY_MY_STATS,
    };
  };
  
  export const userCayegoryDisplay = () => {
    return {
      type: DISPLAY_ALL_USERS_CATEGORY,
    };
  }; 

  export const userEventsDisplay = () => {
    return {
      type: DISPLAY_ALL_EVENTS_CATEGORY,
    };
  }; 

  export const notificationDisplay = () => {
    return {
      type: DISPLAY_NOTIFICATIONS,
    };
  }; 