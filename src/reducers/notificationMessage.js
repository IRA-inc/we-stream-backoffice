import {v1 as uuid} from "uuid"
import omit from 'lodash/omit';
import merge from 'lodash/merge';

import {createReducer} from './../utility';

// import {SET_NOTIFICATION_MESSAGE, DISMISS_NOTIFICATION_MESSAGE, CLEAR_LOADER} from '../actions';

export const notificationMessages = createReducer({}, {
  'DISMISS_NOTIFICATION_MESSAGE'(state, {notificationMessageId}) {
    if (notificationMessageId) {
      return omit(state.notificationMessages, [`${notificationMessageId}`]);
    } else 
      return {}
    },
  'SET_NOTIFICATION_MESSAGE'(state, {notificationMessage}, id = uuid()) {
    return merge({}, state.notificationMessages, {
      [id]: {
        ...notificationMessage,
        id
      }
    });
  },
  'CLEAR_LOADER'(state) {
    return {};
  }
});
