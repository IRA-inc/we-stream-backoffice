import { takeLatest, put, call } from "redux-saga/effects";
import { ApiReq } from "../api";
import {
  VIEW_NOTIFICATION_LOADING_ID,
  GET_ONE_ROLE_LOADING_ID,
} from "../constants/loaders";
import {
  DISPLAY_NOTIFICATIONS,
  VIEW_ALL_NOTIFICATIONS,
//   setNotificationMessage,
  setErrorNotification,
  clearNotificationMessage,
  clearErrorNotification,
  startLoading,
  stopLoading,
} from "../actions";
import { actionType } from "../utility/makeActionCreator";

export function* getAllNotificationAction() {
  yield put(startLoading({ id: VIEW_NOTIFICATION_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/notifications`);
    yield put(stopLoading({ id: VIEW_NOTIFICATION_LOADING_ID }));

    yield put(actionType(DISPLAY_NOTIFICATIONS, response.data));

    yield put(stopLoading({ id: VIEW_NOTIFICATION_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: VIEW_NOTIFICATION_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

// export function* getOneRoleAction(input) {
//   const {
//     payload: { id },
//   } = input;

//   yield put(startLoading({ id: GET_ONE_ROLE_LOADING_ID }));
//   try {
//     const response = yield call(ApiReq.get, `/api/v1/roles/${id}`);
//     yield put(stopLoading({ id: GET_ONE_ROLE_LOADING_ID }));

//     yield put(actionType(DISPLAY_ALL_ORDERS, response.data));

//     yield put(stopLoading({ id: GET_ONE_ROLE_LOADING_ID }));
//   } catch (error) {
//     yield put(stopLoading({ id: GET_ONE_ROLE_LOADING_ID }));
//     yield put(setErrorNotification(error.response.data.Error));
//   }
// }


export function* notificationsSaga() {
  yield takeLatest(VIEW_ALL_NOTIFICATIONS, getAllNotificationAction);
  // yield takeLatest(GET_ONE_ROLE, getOneRoleAction);
}
