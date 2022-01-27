import {makeActionCreator} from '../utility';

export const SET_NOTIFICATION_MESSAGE = 'SET_NOTIFICATION_MESSAGE';
export const setNotificationMessage = makeActionCreator(SET_NOTIFICATION_MESSAGE, 'notificationMessage');
