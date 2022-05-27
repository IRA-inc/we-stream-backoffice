import {makeActionCreator} from '../utility';
import {VIEW_ALL_NOTIFICATIONS} from './actionTypes'
export const SET_NOTIFICATION_MESSAGE = 'SET_NOTIFICATION_MESSAGE';
export const setNotificationMessage = makeActionCreator(SET_NOTIFICATION_MESSAGE, 'payload');
export const CLEAR_NOTIFICATION_MESSAGE = 'CLEAR_NOTIFICATION_MESSAGE';
export const clearNotificationMessage = makeActionCreator(CLEAR_NOTIFICATION_MESSAGE, 'payload');
export const ERROR_NOTIFICATION_MESSAGE = 'ERROR_NOTIFICATION_MESSAGE';
export const setErrorNotification = makeActionCreator(ERROR_NOTIFICATION_MESSAGE, 'payload');
export const CLEAR_ERROR_NOTIFICATION_MESSAGE = 'CLEAR_ERROR_NOTIFICATION_MESSAGE';
export const clearErrorNotification = makeActionCreator(CLEAR_ERROR_NOTIFICATION_MESSAGE, 'payload');
export const viewNotification = makeActionCreator(VIEW_ALL_NOTIFICATIONS, 'payload');
