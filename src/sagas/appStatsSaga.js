import { takeLatest, put, call } from "redux-saga/effects";
import { ApiReq } from "../api";
import {
    APP_STATS_LOADING_ID,
    OWNER_STATS_LOADING_ID,
    TOP_FIVE_EVENT_LOADING_ID,
    MY_TOP_FIVE_EVENT_LOADING_ID,
    USERS_CATEGORY_LOADING_ID,
    EVENTS_CATEGORY_LOADING_ID
} from "../constants/loaders";
import {
  GET_APP_STATS,
  DISPLAY_APP_STATS,
  DISPLAY_MY_STATS,
  startLoading,
  stopLoading,
  GET_ONWER_STATS,
  TOP_FIVE_EVENT,
  DISPLAY_TOP_FIVE,
  DISPLAY_MY_TOP_FIVE,
  MY_TOP_FIVE_EVENT,
  DISPLAY_ALL_USERS_CATEGORY,
  USERS_CATEGORY,
  DISPLAY_ALL_EVENTS_CATEGORY,
  EVENTS_CATEGORY,
  setErrorNotification
} from "../actions";
import { actionType } from "../utility/makeActionCreator";


export function* getStatsAction() {
 
  yield put(startLoading({ id: APP_STATS_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/stastistic/app`);
    yield put(stopLoading({ id: APP_STATS_LOADING_ID }));

    yield put(actionType(DISPLAY_APP_STATS, response.data));

    yield put(stopLoading({ id: APP_STATS_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: APP_STATS_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* getOwnerStatsAction() {
 
    yield put(startLoading({ id: OWNER_STATS_LOADING_ID }));
    try {
      const response = yield call(ApiReq.get, `/api/v1/stastistic/mystats`);
      yield put(stopLoading({ id: OWNER_STATS_LOADING_ID }));
  
      yield put(actionType(DISPLAY_MY_STATS, response.data));
  
      yield put(stopLoading({ id: OWNER_STATS_LOADING_ID }));
    } catch (error) {
      yield put(stopLoading({ id: OWNER_STATS_LOADING_ID }));
      yield put(setErrorNotification(error.response.data.Error));
    }
  }

  export function* getTopFiveEventsAction() {
    yield put(startLoading({ id: TOP_FIVE_EVENT_LOADING_ID }));
    try {
      const response = yield call(ApiReq.get, "/api/v1/stastistic/topfive");
      yield put(stopLoading({ id: TOP_FIVE_EVENT_LOADING_ID }));
  
      yield put(actionType( DISPLAY_TOP_FIVE, response.data));
  
      yield put(stopLoading({ id: TOP_FIVE_EVENT_LOADING_ID }));
    } catch (error) {
      yield put(stopLoading({ id: TOP_FIVE_EVENT_LOADING_ID }));
      yield put(setErrorNotification(error.response.data.Error));
    }
  }  

  export function* getMyTopFiveEventsAction() {
    yield put(startLoading({ id: MY_TOP_FIVE_EVENT_LOADING_ID }));
    try {
      const response = yield call(ApiReq.get, "/api/v1/stastistic/mytopfive");
      yield put(stopLoading({ id: MY_TOP_FIVE_EVENT_LOADING_ID }));
  
      yield put(actionType(DISPLAY_MY_TOP_FIVE, response.data));
  
      yield put(stopLoading({ id: MY_TOP_FIVE_EVENT_LOADING_ID }));
    } catch (error) {
      yield put(stopLoading({ id: MY_TOP_FIVE_EVENT_LOADING_ID }));
      yield put(setErrorNotification(error.response.data.Error));
    }
  }  


  export function* getUserCategoryAction() {
    yield put(startLoading({ id: USERS_CATEGORY_LOADING_ID }));
    try {
      const response = yield call(ApiReq.get, "/api/v1/stastistic/usercategorystats");
      yield put(stopLoading({ id: USERS_CATEGORY_LOADING_ID }));
  
      yield put(actionType(DISPLAY_ALL_USERS_CATEGORY, response.data));
  
      yield put(stopLoading({ id: USERS_CATEGORY_LOADING_ID }));
    } catch (error) {
      yield put(stopLoading({ id: USERS_CATEGORY_LOADING_ID }));
      yield put(setErrorNotification(error.response.data.Error));
    }
  }  

  export function* getEventCategoryAction() {
    yield put(startLoading({ id: EVENTS_CATEGORY_LOADING_ID }));
    try {
      const response = yield call(ApiReq.get, "/api/v1/stastistic/categorystats");
      yield put(stopLoading({ id: EVENTS_CATEGORY_LOADING_ID }));
  
      yield put(actionType(DISPLAY_ALL_EVENTS_CATEGORY, response.data));
  
      yield put(stopLoading({ id: EVENTS_CATEGORY_LOADING_ID }));
    } catch (error) {
      yield put(stopLoading({ id: EVENTS_CATEGORY_LOADING_ID }));
      yield put(setErrorNotification(error.response.data.Error));
    }
  }  


export function* appStatsSaga() {
  yield takeLatest(GET_APP_STATS,getStatsAction);
  yield takeLatest(GET_ONWER_STATS,getOwnerStatsAction);
  yield takeLatest(TOP_FIVE_EVENT,getTopFiveEventsAction);
  yield takeLatest(MY_TOP_FIVE_EVENT,getMyTopFiveEventsAction);
  yield takeLatest(USERS_CATEGORY,getUserCategoryAction);
  yield takeLatest(EVENTS_CATEGORY,getEventCategoryAction);

}
