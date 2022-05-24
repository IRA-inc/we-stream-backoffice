import {makeActionCreator} from '../utility';
import {ALL_MESSAGES, SEND_MESSAGES,GET_ONE_MESSAGE} from './actionTypes'

export const createMessage = makeActionCreator(SEND_MESSAGES, 'payload');
export const getOneMessage = makeActionCreator(GET_ONE_MESSAGE, 'payload');
export const getAllMessage = makeActionCreator(ALL_MESSAGES, 'payload');
// export const editCategory = makeActionCreator(EDIT_CATEGORY, 'payload');
// export const deleteCategoryAction = makeActionCreator(DELETE_CATEGORY, 'payload');





