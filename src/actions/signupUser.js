import {makeActionCreator} from '../utility';

export const SIGNUP_USER = 'SIGNUP_USER';
export const signupUser = makeActionCreator(SIGNUP_USER, 'payload');
