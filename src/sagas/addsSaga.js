import { takeLatest, put, call } from "redux-saga/effects";
import { ApiReq } from "../api";
import {
  CREATE_ADD_LOADING_ID,
  GET_ALL_ADDS_LOADING_ID,
  GET_ONE_ADD_LOADING_ID,
  DELETE_ADD_LOADING_ID,
  EDIT_ADD_LOADING_ID,
} from "../constants/loaders";
import {
  CREATE_ADD,
  GET_ALL_ADDS,
  GET_ONE_ADD,
  EDIT_ADD,
  DISPLAY_ALL_DATA,
  DISPLAY_ONE_DATA,
  DELETE_ADD,
  setNotificationMessage,
  setErrorNotification,
  clearNotificationMessage,
  clearErrorNotification,
  startLoading,
  stopLoading,
} from "../actions";
import { actionType } from "../utility/makeActionCreator";

export function* createNewAdd(roleInput) {
  const {
    payload
  } = roleInput;

  yield put(startLoading({ id: CREATE_ADD_LOADING_ID }));
  try {
    const response = yield call(ApiReq.formPost, "/api/v1/advertsing", payload);
    yield put(stopLoading({ id: CREATE_ADD_LOADING_ID }));

    if (response.data.message) {
      yield put(setNotificationMessage(response.data.message));
    } else {
      yield put(setErrorNotification(response.data.Error));
    }
    //dismiss loading
    yield put(stopLoading({ id: CREATE_ADD_LOADING_ID }));
    yield put(clearNotificationMessage());
  } catch (error) {
    yield put(stopLoading({ id: CREATE_ADD_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
    yield put(clearErrorNotification());
  }
}

export function* getRolesAction(searchInput) {
  const {
    payload: { search,page },
  } = searchInput;
  yield put(startLoading({ id: GET_ALL_ADDS_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/advertsing?search=${search}&page=${page}`);
    yield put(stopLoading({ id: GET_ALL_ADDS_LOADING_ID }));

    yield put(actionType(DISPLAY_ALL_DATA, response.data));

    yield put(stopLoading({ id: GET_ALL_ADDS_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: GET_ALL_ADDS_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* getOneRoleAction(input) {
  const {
    payload: { id },
  } = input;

  yield put(startLoading({ id: GET_ONE_ADD_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/advertsing/${id}`);
    yield put(stopLoading({ id: GET_ONE_ADD_LOADING_ID }));

    yield put(actionType(DISPLAY_ONE_DATA, response.data));

    yield put(stopLoading({ id: GET_ONE_ADD_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: GET_ONE_ADD_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* EditNewAdd(roleInput) {
  const {
    payload: { formData,id },
  } = roleInput;
  yield put(startLoading({ id: EDIT_ADD_LOADING_ID }));
  try {
    const response = yield call(ApiReq.formPatch, `/api/v1/advertsing/${id}`,formData);
    yield put(stopLoading({ id: EDIT_ADD_LOADING_ID }));

    if (response.data.message) {
      yield put(setNotificationMessage(response.data.message));
    } else {
      yield put(setErrorNotification(response.data.Error));
    }
    //dismiss loading
    yield put(stopLoading({ id: EDIT_ADD_LOADING_ID }));
    yield put(clearNotificationMessage());
  } catch (error) {
    yield put(stopLoading({ id: EDIT_ADD_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
    yield put(clearErrorNotification());
  }
}

export function* DeleteRole(roleInput) {
  const {
    payload: { id },
  } = roleInput;
  yield put(startLoading({ id: DELETE_ADD_LOADING_ID }));
  try {
    yield call(ApiReq.destroy, `/api/v1/advertsing/${id}`);
    yield put(stopLoading({ id: DELETE_ADD_LOADING_ID }));
    //dismiss loading
    yield put(stopLoading({ id: DELETE_ADD_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: DELETE_ADD_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* addSaga() {
  yield takeLatest(CREATE_ADD, createNewAdd);
  yield takeLatest(GET_ALL_ADDS, getRolesAction);
  yield takeLatest(GET_ONE_ADD, getOneRoleAction);
  yield takeLatest(EDIT_ADD, EditNewAdd);
  yield takeLatest(DELETE_ADD, DeleteRole);
}
