import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import api from '../middleware/api';
import {initSagas} from './initSagas';

import rootReducer from '../reducers';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, thunk, api];
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(...middlewares)
    )
  );

  initSagas(sagaMiddleware);
  return store;
}

export default configureStore;