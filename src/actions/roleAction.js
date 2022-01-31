import {makeActionCreator} from '../utility';
import {GET_ALL_ROLES,GET_ONE_ROLE,EDIT_ROLE,DELETE_ROLE,CREATE_ROLE} from './actionTypes'


export const GET_ROLES = 'GET_ROLES';
export const createRole = makeActionCreator(CREATE_ROLE, 'payload');
export const getOneRole = makeActionCreator(GET_ONE_ROLE, 'payload');
export const getAllRoles = makeActionCreator(GET_ALL_ROLES, 'payload');
export const editRole = makeActionCreator(EDIT_ROLE, 'payload');
export const deleteRoleAction = makeActionCreator(DELETE_ROLE, 'payload');





