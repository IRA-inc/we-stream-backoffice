import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import {camelizeKeys} from 'humps';
import reportWebVitals from './reportWebVitals';
import configureStore from './store/configureStore'
import { setCurrentUser } from './actions';

const store = configureStore();

if (sessionStorage.jwtToken) {
  const user = camelizeKeys(jwtDecode(sessionStorage.jwtToken));
  if (user) store.dispatch(setCurrentUser(user));
}

if (sessionStorage.jwtToken) {
  const user = camelizeKeys(jwtDecode(sessionStorage.jwtToken));
  if (user) store.dispatch(setCurrentUser(user));
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App store={store} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
