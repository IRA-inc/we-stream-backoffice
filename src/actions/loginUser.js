import {makeActionCreator} from '../utility';

export const LOGIN_USER = 'LOGIN_USER';
export const loginUser = makeActionCreator(LOGIN_USER, 'payload');
