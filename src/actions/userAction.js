import {makeActionCreator} from '../utility';
import {GET_ALL_USERS,GET_ALL_STAFFS,GET_ONE_USER,EDIT_USER,DELETE_USER,CREATE_USER} from './actionTypes'

export const createUser = makeActionCreator(CREATE_USER, 'payload');
export const getOneUser = makeActionCreator(GET_ONE_USER, 'payload');
export const getAllUsers = makeActionCreator(GET_ALL_USERS, 'payload');
export const getAllstaffs = makeActionCreator(GET_ALL_STAFFS, 'payload');
export const editUser = makeActionCreator(EDIT_USER, 'payload');
export const deleteUserAction = makeActionCreator(DELETE_USER, 'payload');





