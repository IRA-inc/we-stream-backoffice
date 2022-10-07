import { takeLatest, put, call } from "redux-saga/effects";
import { ApiReq } from "../api";
import {
  CREATE_CATEGORY_LOADING_ID,
  GET_ALL_CATEGORIES_LOADING_ID,
  GET_ONE_CATEGORY_LOADING_ID,
  DELETE_CATEGORY_LOADING_ID,
  EDIT_CATEGORY_LOADING_ID,
} from "../constants/loaders";
import {
  CREATE_CATEGORY,
  GET_ALL_CATEGORIES,
  GET_ONE_CATEGORY,
  EDIT_CATEGORY,
  DISPLAY_ALL_CATEGORIES,
  DISPLAY_ONE_DATA,
  DELETE_CATEGORY,
  setNotificationMessage,
  setErrorNotification,
  clearNotificationMessage,
  clearErrorNotification,
  startLoading,
  stopLoading,
} from "../actions";
import { actionType } from "../utility/makeActionCreator";

export function* createNewCategory(roleInput) {
  const {
    payload: { name },
  } = roleInput;

  yield put(startLoading({ id: CREATE_CATEGORY_LOADING_ID }));
  try {
    const response = yield call(ApiReq.post, "/api/v1/categories", { name });
    yield put(stopLoading({ id: CREATE_CATEGORY_LOADING_ID }));

    if (response.data.message) {
      yield put(setNotificationMessage(response.data.message));
    } else {
      yield put(setErrorNotification(response.data.Error));
    }
    //dismiss loading
    yield put(stopLoading({ id: CREATE_CATEGORY_LOADING_ID }));
    yield put(clearNotificationMessage());
  } catch (error) {
    yield put(stopLoading({ id: CREATE_CATEGORY_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
    yield put(clearErrorNotification());
  }
}

export function* getCategoriesAction(searchInput) {
  console.log("====> categry1")
  const {
    payload: { search,page },
  } = searchInput;
  yield put(startLoading({ id: GET_ALL_CATEGORIES_LOADING_ID }));
  try {
    console.log("====> view categry")
    const response = yield call(ApiReq.get, `/api/v1/categories??search=${search}&page=${page}&limit=${100}`);
    yield put(stopLoading({ id: GET_ALL_CATEGORIES_LOADING_ID }));

    yield put(actionType(DISPLAY_ALL_CATEGORIES, response.data));

    yield put(stopLoading({ id: GET_ALL_CATEGORIES_LOADING_ID }));
  } catch (error) {
    console.log("====> error",error)
    yield put(stopLoading({ id: GET_ALL_CATEGORIES_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* getOneCategoryAction(input) {
  const {
    payload: { id },
  } = input;

  yield put(startLoading({ id: GET_ONE_CATEGORY_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/categories/${id}`);
    yield put(stopLoading({ id: GET_ONE_CATEGORY_LOADING_ID }));

    yield put(actionType(DISPLAY_ONE_DATA, response.data));

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
    console.log(error)
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

export function* categorySaga() {
  yield takeLatest(CREATE_CATEGORY, createNewCategory);
  yield takeLatest(GET_ALL_CATEGORIES, getCategoriesAction);
  yield takeLatest(GET_ONE_CATEGORY, getOneCategoryAction);
  yield takeLatest(EDIT_CATEGORY, EditNewCategory);
  yield takeLatest(DELETE_CATEGORY, DeleteCategory);
}
