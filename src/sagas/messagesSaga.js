import { takeLatest, put, call } from "redux-saga/effects";
import { ApiReq } from "../api";
import {
  SEND_MESSAGES_LOADING_ID,
  ALL_MESSAGES_LOADING_ID,
  GET_ONE_CATEGORY_LOADING_ID,
  DELETE_CATEGORY_LOADING_ID,
  EDIT_CATEGORY_LOADING_ID,
} from "../constants/loaders";
import {
  SEND_MESSAGES,
  ALL_MESSAGES,
  GET_ONE_MESSAGE,
  EDIT_CATEGORY,
  DISPLAY_ALL_MESSAGES,
  DISPLAY_ONE_MESSAGES,
  DELETE_CATEGORY,
  setNotificationMessage,
  setErrorNotification,
  clearNotificationMessage,
  clearErrorNotification,
  startLoading,
  stopLoading,
} from "../actions";
import { actionType } from "../utility/makeActionCreator";

export function* createNewMessage(roleInput) {
  const {
    payload: {
      messageData: {response },
      id,
    },
  } = roleInput;
  yield put(startLoading({ id: SEND_MESSAGES_LOADING_ID }));
  try {
    const dataresponse = yield call(ApiReq.put, `/api/v1/messages/${id}`, {response});
    yield put(stopLoading({ id: SEND_MESSAGES_LOADING_ID }));

    if (dataresponse.data.message) {
      yield put(setNotificationMessage(dataresponse.data.message));
    } else {
      yield put(setErrorNotification(dataresponse.data.Error));
    }
    //dismiss loading
    yield put(stopLoading({ id: SEND_MESSAGES_LOADING_ID }));
    yield put(clearNotificationMessage());
  } catch (error) {
    yield put(stopLoading({ id: SEND_MESSAGES_LOADING_ID }));
    yield put(setErrorNotification(error.dataresponse.data.Error));
    yield put(clearErrorNotification());
  }
}

export function* getMessagesAction(searchInput) {
  const {
    payload: { search,page },
  } = searchInput;
  yield put(startLoading({ id: ALL_MESSAGES_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/messages?search=${search}&page=${page}`);
    yield put(stopLoading({ id: ALL_MESSAGES_LOADING_ID }));

    yield put(actionType(DISPLAY_ALL_MESSAGES, response.data));

    yield put(stopLoading({ id: ALL_MESSAGES_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: ALL_MESSAGES_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* getOneMessageAction(input) {
  const {
    payload: { id },
  } = input;

  yield put(startLoading({ id: GET_ONE_CATEGORY_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/messages/${id}`);
    yield put(stopLoading({ id: GET_ONE_CATEGORY_LOADING_ID }));

    yield put(actionType(DISPLAY_ONE_MESSAGES, response.data));

    yield put(stopLoading({ id: GET_ONE_CATEGORY_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: GET_ONE_CATEGORY_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* EditNewCategory(roleInput) {
  const {
    payload: {
      category: { name },
      id,
    },
  } = roleInput;
  yield put(startLoading({ id: EDIT_CATEGORY_LOADING_ID }));
  try {
    const response = yield call(ApiReq.put, `/api/v1/categories/${id}`, { name });
    yield put(stopLoading({ id: EDIT_CATEGORY_LOADING_ID }));

    if (response.data.message) {
      yield put(setNotificationMessage(response.data.message));
    } else {
      yield put(setErrorNotification(response.data.Error));
    }
    //dismiss loading
    yield put(stopLoading({ id: EDIT_CATEGORY_LOADING_ID }));
    yield put(clearNotificationMessage());
  } catch (error) {
    yield put(stopLoading({ id: EDIT_CATEGORY_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
    yield put(clearErrorNotification());
  }
}

export function* DeleteCategory(roleInput) {
  const {
    payload: { id },
  } = roleInput;
  yield put(startLoading({ id: DELETE_CATEGORY_LOADING_ID }));
  try {
    yield call(ApiReq.destroy, `/api/v1/categories/${id}`);
    yield put(stopLoading({ id: DELETE_CATEGORY_LOADING_ID }));
    //dismiss loading
    yield put(stopLoading({ id: DELETE_CATEGORY_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: DELETE_CATEGORY_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* messageSaga() {
  yield takeLatest(SEND_MESSAGES, createNewMessage);
  yield takeLatest(ALL_MESSAGES, getMessagesAction);
  yield takeLatest(GET_ONE_MESSAGE, getOneMessageAction);
  yield takeLatest(EDIT_CATEGORY, EditNewCategory);
  yield takeLatest(DELETE_CATEGORY, DeleteCategory);
}
