import {takeLatest, put} from 'redux-saga/effects';

import {HANDLE_HTTP_ERROR} from '../actions';

import {handleAppError} from "../api/AppErrorHandler";
import {setNotificationMessage, signOut} from '../actions';

export function * handleHTTPError(payload) {
  const {
    response = {}
  } = payload;
  const {
    data = [
      {
        code: 0
      }
    ]
  } = response.data || {};
  const [result] = data instanceof Array
    ? data
    : [data];
  switch (Number(result.code || null)) {
    case 500:
    case 503:
      yield put(signOut());
      yield put(setNotificationMessage({notificationType: 'ERROR', title: handleAppError(response)}));
      break;
    default:
      yield put(setNotificationMessage({
        notificationType: 'ERROR',
        title: handleAppError(response || 'An unexpected error has occured, please Check your network connection.'),
        data: {
          message: handleAppError(response || 'An unexpected error has occured, please Check your network connection.')
        }
      }));
      break;
  }
};

export function * errorHandlingSaga() {
  yield takeLatest(HANDLE_HTTP_ERROR, handleHTTPError);
};