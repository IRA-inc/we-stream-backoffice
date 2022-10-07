import {createReducer} from './../utility';

export const ResponseMessage = createReducer({}, {
  'SET_NOTIFICATION_MESSAGE'(_state, {payload}) {
    console.log("notificationsError=====>")
    return payload;
  }, 
  'CLEAR_NOTIFICATION_MESSAGE'(_state, {payload}) {
    return payload===null;
  }, 
  
});

export const ErrorResponseMessage = createReducer({}, {
  'ERROR_NOTIFICATION_MESSAGE'(_state, {payload}) {
    return payload;
  },
  'CLEAR_ERROR_NOTIFICATION_MESSAGE'(_state, {payload}) {
    return payload===null;
  },
});