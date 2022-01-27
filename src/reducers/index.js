import {combineReducers} from 'redux';
import {loader} from './loader';
import {currentUser} from './currentUser';
import {notificationMessages} from './notificationMessage';


const rootReducer = combineReducers({
    loader,
    currentUser,
    notificationMessages,
  });
  
export default rootReducer;
