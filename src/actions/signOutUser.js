import {makeActionCreator} from '../utility';

export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const signOut = makeActionCreator(SIGN_OUT_USER);
