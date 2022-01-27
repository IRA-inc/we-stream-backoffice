import {makeActionCreator} from '../utility';

export const DISMISS_NOTIFICATION_MESSAGE = 'DISMISS_NOTIFICATION_MESSAGE';
export const dismissNotificationMessage = makeActionCreator(DISMISS_NOTIFICATION_MESSAGE, 'notificationMessageId');