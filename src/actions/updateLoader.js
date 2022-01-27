import {makeActionCreator} from '../utility';

export const UPDATE_LOADER = 'UPDATE_LOADER';
export const updateLoader = makeActionCreator(UPDATE_LOADER, 'data');