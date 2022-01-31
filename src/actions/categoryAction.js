import {makeActionCreator} from '../utility';
import {GET_ALL_CATEGORIES,GET_ONE_CATEGORY,EDIT_CATEGORY,DELETE_CATEGORY,CREATE_CATEGORY} from './actionTypes'

export const createCategory = makeActionCreator(CREATE_CATEGORY, 'payload');
export const getOneCategory = makeActionCreator(GET_ONE_CATEGORY, 'payload');
export const getAllCategories = makeActionCreator(GET_ALL_CATEGORIES, 'payload');
export const editCategory = makeActionCreator(EDIT_CATEGORY, 'payload');
export const deleteCategoryAction = makeActionCreator(DELETE_CATEGORY, 'payload');





