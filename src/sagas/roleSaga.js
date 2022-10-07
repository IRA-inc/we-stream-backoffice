import { takeLatest, put, call } from "redux-saga/effects";
import { ApiReq } from "../api";
import {
  CREATE_ROLE_LOADING_ID,
  GET_ALL_ROLES_LOADING_ID,
  GET_ONE_ROLE_LOADING_ID,
  DELETE_ROLE_LOADING_ID,
  EDIT_ROLE_LOADING_ID,
} from "../constants/loaders";
import {
  CREATE_ROLE,
  GET_ALL_ROLES,
  GET_ONE_ROLE,
  EDIT_ROLE,
  DISPLAY_ALL_DATA,
  DISPLAY_ONE_DATA,
  DELETE_ROLE,
  setNotificationMessage,
  setErrorNotification,
  clearNotificationMessage,
  clearErrorNotification,
  startLoading,
  stopLoading,
} from "../actions";
import { actionType } from "../utility/makeActionCreator";

export function* createNewRole(roleInput) {
  const {
    payload: { name },
  } = roleInput;

  yield put(startLoading({ id: CREATE_ROLE_LOADING_ID }));
  try {
    const response = yield call(ApiReq.post, "/api/v1/roles", { name });
    yield put(stopLoading({ id: CREATE_ROLE_LOADING_ID }));

    if (response.data.message) {
      yield put(setNotificationMessage(response.data.message));
    } else {
      yield put(setErrorNotification(response.data.Error));
    }
    //dismiss loading
    yield put(stopLoading({ id: CREATE_ROLE_LOADING_ID }));
    yield put(clearNotificationMessage());
  } catch (error) {
    yield put(stopLoading({ id: CREATE_ROLE_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
    yield put(clearErrorNotification());
  }
}

export function* getRolesAction(searchInput) {
  const {
    payload: { search,page },
  } = searchInput;
  yield put(startLoading({ id: GET_ALL_ROLES_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/roles?search=${search}&page=${page}&limit=${100}`);
    yield put(stopLoading({ id: GET_ALL_ROLES_LOADING_ID }));

    yield put(actionType(DISPLAY_ALL_DATA, response.data));

    yield put(stopLoading({ id: GET_ALL_ROLES_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: GET_ALL_ROLES_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* getOneRoleAction(input) {
  const {
    payload: { id },
  } = input;

  yield put(startLoading({ id: GET_ONE_ROLE_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/roles/${id}`);
    yield put(stopLoading({ id: GET_ONE_ROLE_LOADING_ID }));

    yield put(actionType(DISPLAY_ONE_DATA, response.data));

    yield put(stopLoading({ id: GET_ONE_ROLE_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: GET_ONE_ROLE_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* EditNewRole(roleInput) {
  const {
    payload: {
      role: { name },
      id,
    },
  } = roleInput;
  yield put(startLoading({ id: EDIT_ROLE_LOADING_ID }));
  try {
    const response = yield call(ApiReq.put, `/api/v1/roles/${id}`, { name });
    yield put(stopLoading({ id: EDIT_ROLE_LOADING_ID }));

    if (response.data.message) {
      yield put(setNotificationMessage(response.data.message));
    } else {
      yield put(setErrorNotification(response.data.Error));
    }
    //dismiss loading
    yield put(stopLoading({ id: EDIT_ROLE_LOADING_ID }));
    yield put(clearNotificationMessage());
  } catch (error) {
    yield put(stopLoading({ id: EDIT_ROLE_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
    yield put(clearErrorNotification());
  }
}

export function* DeleteRole(roleInput) {
  const {
    payload: { id },
  } = roleInput;
  yield put(startLoading({ id: DELETE_ROLE_LOADING_ID }));
  try {
    yield call(ApiReq.destroy, `/api/v1/roles/${id}`);
    yield put(stopLoading({ id: DELETE_ROLE_LOADING_ID }));
    //dismiss loading
    yield put(stopLoading({ id: DELETE_ROLE_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: DELETE_ROLE_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* roleSaga() {
  yield takeLatest(CREATE_ROLE, createNewRole);
  yield takeLatest(GET_ALL_ROLES, getRolesAction);
  yield takeLatest(GET_ONE_ROLE, getOneRoleAction);
  yield takeLatest(EDIT_ROLE, EditNewRole);
  yield takeLatest(DELETE_ROLE, DeleteRole);
}
