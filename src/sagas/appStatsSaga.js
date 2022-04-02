import { takeLatest, put, call } from "redux-saga/effects";
import { ApiReq } from "../api";
import {
    APP_STATS_LOADING_ID,
    OWNER_STATS_LOADING_ID,
} from "../constants/loaders";
import {
  GET_APP_STATS,
  DISPLAY_ONE_DATA,
  DISPLAY_ALL_DATA,
  startLoading,
  stopLoading,
  GET_ONWER_STATS,
  setErrorNotification
} from "../actions";
import { actionType } from "../utility/makeActionCreator";


export function* getStatsAction() {
 
  yield put(startLoading({ id: APP_STATS_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/stastistic/app`);
    yield put(stopLoading({ id: APP_STATS_LOADING_ID }));

    yield put(actionType(DISPLAY_ONE_DATA, response.data));

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
  
      yield put(actionType(DISPLAY_ALL_DATA, response.data));
  
      yield put(stopLoading({ id: OWNER_STATS_LOADING_ID }));
    } catch (error) {
      yield put(stopLoading({ id: OWNER_STATS_LOADING_ID }));
      yield put(setErrorNotification(error.response.data.Error));
    }
  }


export function* appStatsSaga() {
  yield takeLatest(GET_APP_STATS,getStatsAction);
  yield takeLatest(GET_ONWER_STATS,getOwnerStatsAction);

}
