import {makeActionCreator} from '../utility';
import {GET_ALL_USERS,EDIT_PROFILE,GET_ALL_STAFFS,GET_ONE_USER,EDIT_USER,DELETE_USER,CREATE_USER,ACTIVATE_USER,MY_PROFILE} from './actionTypes'

export const createUser = makeActionCreator(CREATE_USER, 'payload');
export const getOneUser = makeActionCreator(GET_ONE_USER, 'payload');
export const getAllUsers = makeActionCreator(GET_ALL_USERS, 'payload');
export const getAllstaffs = makeActionCreator(GET_ALL_STAFFS, 'payload');
export const editUser = makeActionCreator(EDIT_USER, 'payload');
export const deleteUserAction = makeActionCreator(DELETE_USER, 'payload');
export const activateUserAction= makeActionCreator(ACTIVATE_USER, 'payload');
export const myProfileAction= makeActionCreator(MY_PROFILE, 'payload');
export const editProfileAction= makeActionCreator(EDIT_PROFILE, 'payload');





