import {makeActionCreator} from '../utility';
import {GET_APP_STATS,GET_ONWER_STATS,TOP_FIVE_EVENT,MY_TOP_FIVE_EVENT,USERS_CATEGORY,EVENTS_CATEGORY} from './actionTypes'

export const getAppStats = makeActionCreator(GET_APP_STATS, 'payload');
export const getOwnerStats = makeActionCreator(GET_ONWER_STATS, 'payload');
export const getTopFiveEvents = makeActionCreator(TOP_FIVE_EVENT, "payload");
export const getMyTopFiveEvents = makeActionCreator(MY_TOP_FIVE_EVENT, "payload");
export const getUserscategory = makeActionCreator(USERS_CATEGORY, "payload");
export const getEventscategory = makeActionCreator(EVENTS_CATEGORY, "payload");

