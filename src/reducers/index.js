import {combineReducers} from 'redux';
import {loader} from './loader';
import {currentUser} from './currentUser';
import {Roles}from './roleReducer';
import {categories}from './categoryReducer';
import {users}from './userReducer';
import {events}from './eventReducer';
import {appStatsReducer} from './appStatsReducer';
import {orders} from './orderReducer';
import {notifications} from './notifications';
import {payments} from './payments';
import {messages} from './messageReducer'
import {advertesments} from './advertisements'

import {ResponseMessage,ErrorResponseMessage}from './responseReducer'


const rootReducer = combineReducers({
    loader,
    currentUser,
    Roles,
    categories,
    users,
    events,
    orders,
    appStatsReducer,
    ErrorResponseMessage,
    ResponseMessage,
    messages,
    payments,
    notifications,
    advertesments,
  });
  
export default rootReducer;
