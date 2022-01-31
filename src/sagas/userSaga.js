import { takeLatest, put, call } from "redux-saga/effects";
import { ApiReq } from "../api";
import {
  CREATE_USER_LOADING_ID,
  GET_ALL_USERS_LOADING_ID,
  GET_ONE_USER_LOADING_ID,
  DELETE_USER_LOADING_ID,
  EDIT_USER_LOADING_ID,
} from "../constants/loaders";
import {
  CREATE_USER,
  GET_ALL_USERS,
  GET_ONE_USER,
  EDIT_USER,
  DISPLAY_ALL_DATA,
  DISPLAY_ONE_DATA,
  DISPLAY_ALL_STAFF,
  DELETE_USER,
  GET_ALL_STAFFS,
  setNotificationMessage,
  setErrorNotification,
  clearNotificationMessage,
  clearErrorNotification,
  startLoading,
  stopLoading,
} from "../actions";
import { actionType } from "../utility/makeActionCreator";

export function* createNewUser(userInput) {
  const {
    payload:{
        name,
        username,
        email,
        phoneNumber,
        password,
        role,
        gender,
        approvalLevel
    },
  } = userInput;
  
  yield put(startLoading({ id: CREATE_USER_LOADING_ID }));
  try {
    const response = yield call(ApiReq.post, "/api/v1/users", {name,
        username,
        email,
        phoneNumber,
        password,
        role,
        gender,
        approvalLevel});
    yield put(stopLoading({ id: CREATE_USER_LOADING_ID }));
   
    if (response.data.message) {
      yield put(setNotificationMessage(response.data.message));
    } else {
      yield put(setErrorNotification(response.data.Error));
    }
    //dismiss loading
    yield put(stopLoading({ id: CREATE_USER_LOADING_ID }));
    yield put(clearNotificationMessage());
  } catch (error) {
    yield put(stopLoading({ id: CREATE_USER_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
    yield put(clearErrorNotification());
  }
}

export function* getUsersAction() {
  yield put(startLoading({ id: GET_ALL_USERS_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, "/api/v1/users");
    yield put(stopLoading({ id: GET_ALL_USERS_LOADING_ID }));

    yield put(actionType(DISPLAY_ALL_DATA, response.data));

    yield put(stopLoading({ id: GET_ALL_USERS_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: GET_ALL_USERS_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* getStaffsAction() {
  yield put(startLoading({ id: GET_ALL_USERS_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, "/api/v1/users/staffs");
    yield put(stopLoading({ id: GET_ALL_USERS_LOADING_ID }));

    yield put(actionType(DISPLAY_ALL_STAFF, response.data));

    yield put(stopLoading({ id: GET_ALL_USERS_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: GET_ALL_USERS_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}


export function* getOneUserAction(input) {
  const {
    payload: { id },
  } = input;

  yield put(startLoading({ id: GET_ONE_USER_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/users/${id}`);
    yield put(stopLoading({ id: GET_ONE_USER_LOADING_ID }));

    yield put(actionType(DISPLAY_ONE_DATA, response.data));

    yield put(stopLoading({ id: GET_ONE_USER_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: GET_ONE_USER_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* EditNewUser(userInput) {
  const {
    payload:{
      user:{
        name,
        username,
        email,
        phoneNumber,
        role,
        gender,
        approvalLevel
    },
    id
  },
  } = userInput;
  yield put(startLoading({ id: EDIT_USER_LOADING_ID }));
  try {
    const response = yield call(ApiReq.patch, `/api/v1/users/${id}`,{name,
      username,
      email,
      phoneNumber,
      role,
      gender,
      approvalLevel});
    yield put(stopLoading({ id: EDIT_USER_LOADING_ID }));

    if (response.data.message) {
      yield put(setNotificationMessage(response.data.message));
    } else {
      yield put(setErrorNotification(response.data.Error));
    }
    //dismiss loading
    yield put(stopLoading({ id: EDIT_USER_LOADING_ID }));
    yield put(clearNotificationMessage());
  } catch (error) {
    console.log("response====>",error);
    yield put(stopLoading({ id: EDIT_USER_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
    yield put(clearErrorNotification());
  }
}

export function* DeleteUser(roleInput) {
  const {
    payload: { id },
  } = roleInput;
  yield put(startLoading({ id: DELETE_USER_LOADING_ID }));
  try {
    yield call(ApiReq.destroy, `/api/v1/users/${id}`);
    yield put(stopLoading({ id: DELETE_USER_LOADING_ID }));
    //dismiss loading
    yield put(stopLoading({ id: DELETE_USER_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: DELETE_USER_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* userSaga() {
  yield takeLatest(CREATE_USER, createNewUser);
  yield takeLatest(GET_ALL_USERS, getUsersAction);
  yield takeLatest(GET_ALL_STAFFS, getStaffsAction);
  yield takeLatest(GET_ONE_USER, getOneUserAction);
  yield takeLatest(EDIT_USER, EditNewUser);
  yield takeLatest(DELETE_USER, DeleteUser);
}
