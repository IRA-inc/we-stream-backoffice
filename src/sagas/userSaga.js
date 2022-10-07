import { takeLatest, put, call } from "redux-saga/effects";
import { ApiReq } from "../api";
import {
  CREATE_USER_LOADING_ID,
  GET_ALL_USERS_LOADING_ID,
  GET_ONE_USER_LOADING_ID,
  DELETE_USER_LOADING_ID,
  EDIT_USER_LOADING_ID,
  MY_PROFILE_LOADING_ID,
  EDIT_PROFILE_LOADING_ID
} from "../constants/loaders";
import {
  CREATE_USER,
  GET_ALL_USERS,
  GET_ONE_USER,
  EDIT_PROFILE,
  EDIT_USER,
  DISPLAY_ALL_DATA,
  DISPLAY_ONE_DATA,
  DISPLAY_ALL_STAFF,
  DISPLAY_MY_PROFILE,
  MY_PROFILE,
  DELETE_USER,
  GET_ALL_STAFFS,
  ACTIVATE_USER,
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

export function* getUsersAction(searchInput) {
  const {
    payload: { search,page },
  } = searchInput;
  yield put(startLoading({ id: GET_ALL_USERS_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/users?search=${search}&page=${page}`);
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
    const response = yield call(ApiReq.get, `/api/v1/users/staffs?limit=${100000}`);
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

export function* EditProfile(userInput) {
  console.log("sagaaction=====>")
  const {
    payload:{
      user:{
        name,
        username,
        email,
        phoneNumber,
        gender,
    },
  },
  } = userInput;
  yield put(startLoading({ id: EDIT_PROFILE_LOADING_ID }));
  try {
    const response = yield call(ApiReq.patch, `/api/v1/users/updateProfile`,{name,
      username,
      email,
      phoneNumber,
      gender,
    });
    yield put(stopLoading({ id: EDIT_PROFILE_LOADING_ID }));
    if (response.data.message) {
      yield put(setNotificationMessage(response.data.message));
    } else {
      yield put(setErrorNotification(response.data.Error));
    }
    //dismiss loading
    yield put(stopLoading({ id: EDIT_PROFILE_LOADING_ID }));
    yield put(clearNotificationMessage());
  } catch (error) {
    console.log("response====>",error);
    yield put(stopLoading({ id: EDIT_PROFILE_LOADING_ID }));
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

export function* activateUser(roleInput) {
  const {
    payload: { id },
  } = roleInput;
  yield put(startLoading({ id: DELETE_USER_LOADING_ID }));
  try {
    yield call(ApiReq.patch, `/api/v1/users/activate/${id}`);
    yield put(stopLoading({ id: DELETE_USER_LOADING_ID }));
    //dismiss loading
    yield put(stopLoading({ id: DELETE_USER_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: DELETE_USER_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* getMyProfileAction() {
 
  yield put(startLoading({ id: MY_PROFILE_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/users/myprofile`);
    yield put(stopLoading({ id: MY_PROFILE_LOADING_ID }));

    yield put(actionType(DISPLAY_MY_PROFILE, response.data));

    yield put(stopLoading({ id: MY_PROFILE_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: MY_PROFILE_LOADING_ID }));
    // yield put(ErrorResponse(error.response.data.Error));
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
  yield takeLatest(ACTIVATE_USER, activateUser);
  yield takeLatest(MY_PROFILE, getMyProfileAction);
  yield takeLatest(EDIT_PROFILE, EditProfile);
  
}
