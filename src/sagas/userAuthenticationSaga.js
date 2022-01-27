import {takeLatest, put, call} from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import {camelizeKeys} from 'humps';
import {ApiReq, handleAppError} from '../api';
import {SIGN_IN_LOADING_ID} from '../constants/loaders';
import {
    SIGN_OUT_USER,
    LOGIN_USER,
    handleHTTPError,
    startLoading,
    stopLoading,
    setNotificationMessage,
    setCurrentUser,
} from '../actions';
import { startsWith } from 'lodash';


export function * loginUser(userCredentials) {
    const {
      payload: {
        username,
        password
      }
    } = userCredentials;
  
    yield put(startLoading({id: SIGN_IN_LOADING_ID}));
    try {
      const response = yield call(ApiReq.post, '/api/v1/auth/login', {username, password});

      const {
          token
        } = response.data;

      yield put(stopLoading({id: SIGN_IN_LOADING_ID}));
      const user = camelizeKeys(jwtDecode(token));
      sessionStorage.setItem('jwtToken', token);

      if (user) {
        yield put(setCurrentUser(user));
      } 
      else {
        yield put(setNotificationMessage({notificationType: 'ERROR', title: 'An error has occured while Signing in'}));
      }
      //dismiss loading
      yield put(stopLoading({id: SIGN_IN_LOADING_ID}))
  
    } catch (error) {
      yield put(stopLoading({id: SIGN_IN_LOADING_ID}));
      yield put(handleHTTPError(error.response));
    }
}

export function * signOutUser() {
    try {
      const response = yield call(ApiReq.destroy, `/api/v1/auth/logout`);
      const { message } = response.data;

    if(startsWith(`${message}`, 'Token')) {
        sessionStorage.removeItem('jwtToken')
    }

    } catch (error) {
      yield put(handleAppError(error.response, true));
    }
};

export function * userAuthenticationSaga() {
  yield takeLatest(SIGN_OUT_USER, signOutUser);
  yield takeLatest(LOGIN_USER, loginUser);
};
