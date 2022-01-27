import {makeActionCreator} from '../utility';

export const CLEAR_ENTITIES_CACHE = 'CLEAR_ENTITIES_CACHE';

export const clearEntitiesCache = makeActionCreator(CLEAR_ENTITIES_CACHE);
