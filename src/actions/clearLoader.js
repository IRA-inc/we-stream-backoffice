import {makeActionCreator} from '../utility';

export const CLEAR_LOADER = 'CLEAR_LOADER';

export const clearLoader = makeActionCreator(CLEAR_LOADER);