import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import api from '../middleware/api';

import {initSagas} from './initSagas';

import rootReducer from '../reducers';
import DevTools from '../components/common/DevTools';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, thunk, api, logger];
  const store = createStore(rootReducer, compose(applyMiddleware(...middlewares), DevTools.instrument()));
  initSagas(sagaMiddleware);
  return store;
};

export default configureStore;