import {makeActionCreator} from '../utility';
import {GET_ALL_ADDS,GET_ONE_ADD,EDIT_ADD,DELETE_ADD,CREATE_ADD} from './actionTypes'

export const createAdd = makeActionCreator(CREATE_ADD, 'payload');
export const getOneAdd = makeActionCreator(GET_ONE_ADD, 'payload');
export const getAllAdds = makeActionCreator(GET_ALL_ADDS, 'payload');
export const editAdd = makeActionCreator(EDIT_ADD, 'payload');
export const deleteAddAction = makeActionCreator(DELETE_ADD, 'payload');





