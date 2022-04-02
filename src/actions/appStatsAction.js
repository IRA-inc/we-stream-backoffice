import {makeActionCreator} from '../utility';
import {GET_APP_STATS,GET_ONWER_STATS} from './actionTypes'

export const getAppStats = makeActionCreator(GET_APP_STATS, 'payload');
export const getOwnerStats = makeActionCreator(GET_ONWER_STATS, 'payload');


