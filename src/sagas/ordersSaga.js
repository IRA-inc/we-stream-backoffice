import { takeLatest, put, call } from "redux-saga/effects";
import { ApiReq } from "../api";
import {
  OWNER_ORDERS_LOADING_ID,
  GET_ONE_ROLE_LOADING_ID,
} from "../constants/loaders";
import {
  GET_ONWER_ORDERS,
  GET_ONE_ROLE,
  DISPLAY_ALL_DATA,
  DISPLAY_ONE_DATA,
  DISPLAY_ALL_ORDERS,
  setNotificationMessage,
  setErrorNotification,
  clearNotificationMessage,
  clearErrorNotification,
  startLoading,
  stopLoading,
} from "../actions";
import { actionType } from "../utility/makeActionCreator";

export function* getOwnerOdersAction(searchInput) {
  const {
    payload: { search,page },
  } = searchInput;
  yield put(startLoading({ id: OWNER_ORDERS_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/orders/viewers/orders?search=${search}&page=${page}`);
    yield put(stopLoading({ id: OWNER_ORDERS_LOADING_ID }));

    yield put(actionType(DISPLAY_ALL_ORDERS, response.data));

    yield put(stopLoading({ id: OWNER_ORDERS_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: OWNER_ORDERS_LOADING_ID }));
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


export function* ordersSaga() {
  yield takeLatest(GET_ONWER_ORDERS, getOwnerOdersAction);
  // yield takeLatest(GET_ONE_ROLE, getOneRoleAction);
}
