import React from 'react';

import {Provider} from "react-redux";
import {history} from "./store";

//router
import LayoutRoute from './router/routes';

import './assets/css/bootstrap.min.css'
import './assets/css/typography.css'
import './assets/css/style.css';
import './assets/css/responsive.css'

function App({store}) {
  return (
    <div className="App">
      <Provider store={store}>
        <LayoutRoute history={history}/>
      </Provider>
    </div>
  );
}

export default App;
