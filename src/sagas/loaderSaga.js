import {put, takeEvery} from 'redux-saga/effects';

import {STOP_LOADING, START_LOADING, updateLoader} from '../actions';

export function * handleStopLoading({loaderData}) {
  const {
    id,
    ...extra
  } = loaderData;
  const data = {
    [id]: {
      isLoading: false,
      ...extra
    }
  };
  yield put(updateLoader(data));
};

export function * handleStartLoading({loaderData}) {
  const {
    id,
    ...extra
  } = loaderData;
  const data = {
    [id]: {
      isLoading: true,
      ...extra
    }
  };
  yield put(updateLoader(data));
};

export function * loaderSaga() {
  yield takeEvery(START_LOADING, handleStartLoading);
  yield takeEvery(STOP_LOADING, handleStopLoading);
};
