import {makeActionCreator} from '../utility';

export const SEND_RESEND_LINK = 'SEND_RESEND_LINK';
export const sendResetLink = makeActionCreator(SEND_RESEND_LINK, 'payload');

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const resetPassword = makeActionCreator(RESET_PASSWORD, 'payload');

export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const updatePassword = makeActionCreator(UPDATE_PASSWORD, 'payload');
