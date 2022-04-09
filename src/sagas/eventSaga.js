import { takeLatest, put, call } from "redux-saga/effects";
import { ApiReq } from "../api";
import {
  CREATE_EVENT_LOADING_ID,
  GET_ALL_EVENTS_LOADING_ID,
  GET_ONE_EVENT_LOADING_ID,
  DELETE_EVENT_LOADING_ID,
  EDIT_EVENT_LOADING_ID,
  GET_PENDING_EVENTS_LOADING_ID,
  GET_MY_EVENTS_LOADING_ID,
  ACTIVATE_EVENT_LOADING_ID,
  CANCEL_EVENT_LOADING_ID,
  APPROVE_EVENT_LOADING_ID,
} from "../constants/loaders";
import {
  CREATE_EVENT,
  GET_ALL_EVENTS,
  GET_PENDING_EVENTS,
  GET_MY_EVENTS,
  GET_ONE_EVENT,
  EDIT_EVENT,
  DISPLAY_ALL_DATA,
  DISPLAY_ONE_DATA,
  DELETE_EVENT,
  ACTIVATE_EVENT,
  CANCEL_EVENT,
  APPROVE_EVENT,
  OWNER_CREATE_EVENT,
  OWNER_EDIT_EVENT,
  setNotificationMessage,
  setErrorNotification,
  clearNotificationMessage,
  clearErrorNotification,
  startLoading,
  stopLoading,
} from "../actions";
import { actionType } from "../utility/makeActionCreator";

export function* createNewEvent(eventInput) {
  const {
    payload
    
  } = eventInput;
  yield put(startLoading({ id: CREATE_EVENT_LOADING_ID }));
  try {
    
    const response = yield call(ApiReq.formPost, "/api/v1/events",payload);
    yield put(stopLoading({ id: CREATE_EVENT_LOADING_ID }));
   
    if (response.data.message) {
      yield put(setNotificationMessage(response.data.message));
    } else {
      yield put(setErrorNotification(response.data.Error));
    }
    // dismiss loading
    yield put(stopLoading({ id: CREATE_EVENT_LOADING_ID }));
    yield put(clearNotificationMessage());
  } catch (error) {
    yield put(stopLoading({ id: CREATE_EVENT_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
    yield put(clearErrorNotification());
  }
}

export function* ownerCreateNewEvent(eventInput) {
  const {
    payload 
  } = eventInput;
  yield put(startLoading({ id: CREATE_EVENT_LOADING_ID }));
  try {
    
    const response = yield call(ApiReq.formPost, "/api/v1/events/create",payload);
    yield put(stopLoading({ id: CREATE_EVENT_LOADING_ID }));
   
    if (response.data.message) {
      yield put(setNotificationMessage(response.data.message));
    } else {
      yield put(setErrorNotification(response.data.Error));
    }
    // dismiss loading
    yield put(stopLoading({ id: CREATE_EVENT_LOADING_ID }));
    yield put(clearNotificationMessage());
  } catch (error) {
    yield put(stopLoading({ id: CREATE_EVENT_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
    yield put(clearErrorNotification());
  }
}

export function* getEventsAction(searchInput) {
  const {
    payload: { search,page },
  } = searchInput;

  yield put(startLoading({ id: GET_ALL_EVENTS_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/events?search=${search}&page=${page}`);
    yield put(stopLoading({ id: GET_ALL_EVENTS_LOADING_ID }));

    yield put(actionType(DISPLAY_ALL_DATA, response.data));

    yield put(stopLoading({ id: GET_ALL_EVENTS_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: GET_ALL_EVENTS_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* getPendingEventsAction(searchInput) {
  const {
    payload: { search,page },
  } = searchInput;
  yield put(startLoading({ id: GET_PENDING_EVENTS_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/events/pending?search=${search}&page=${page}`);
    yield put(stopLoading({ id: GET_PENDING_EVENTS_LOADING_ID }));

    yield put(actionType(DISPLAY_ALL_DATA, response.data));

    yield put(stopLoading({ id: GET_PENDING_EVENTS_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: GET_PENDING_EVENTS_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* getMyEventsAction(searchInput) {
  const {
    payload: { search,page },
  } = searchInput;
  yield put(startLoading({ id: GET_MY_EVENTS_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/events/myevents?search=${search}&page=${page}`);
    yield put(stopLoading({ id: GET_MY_EVENTS_LOADING_ID }));

    yield put(actionType(DISPLAY_ALL_DATA, response.data));

    yield put(stopLoading({ id: GET_MY_EVENTS_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: GET_MY_EVENTS_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* getOneEventAction(input) {
  const {
    payload: { id },
  } = input;

  yield put(startLoading({ id: GET_ONE_EVENT_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/events/${id}`);
    yield put(stopLoading({ id: GET_ONE_EVENT_LOADING_ID }));

    yield put(actionType(DISPLAY_ONE_DATA, response.data));

    yield put(stopLoading({ id: GET_ONE_EVENT_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: GET_ONE_EVENT_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* EditNewEvent(eventInput) {
  const {
    payload: { formData,id },
  } = eventInput;
  yield put(startLoading({ id: EDIT_EVENT_LOADING_ID }));
  try {
    const response = yield call(ApiReq.formPatch, `/api/v1/events/${id}`,formData);
    yield put(stopLoading({ id: EDIT_EVENT_LOADING_ID }));

    if (response.data.message) {
      yield put(setNotificationMessage(response.data.message));
    } else {
      yield put(setErrorNotification(response.data.Error));
    }
    //dismiss loading
    yield put(stopLoading({ id: EDIT_EVENT_LOADING_ID }));
    yield put(clearNotificationMessage());
  } catch (error) {
    console.log("response====>",error);
    yield put(stopLoading({ id: EDIT_EVENT_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
    yield put(clearErrorNotification());
  }
}

export function* ownerEditNewEvent(eventInput) {
  const {
    payload: { formData,id },
  } = eventInput;
  yield put(startLoading({ id: EDIT_EVENT_LOADING_ID }));
  try {
    const response = yield call(ApiReq.formPatch, `/api/v1/events/update/${id}`,formData);
    yield put(stopLoading({ id: EDIT_EVENT_LOADING_ID }));

    if (response.data.message) {
      yield put(setNotificationMessage(response.data.message));
    } else {
      yield put(setErrorNotification(response.data.Error));
    }
    //dismiss loading
    yield put(stopLoading({ id: EDIT_EVENT_LOADING_ID }));
    yield put(clearNotificationMessage());
  } catch (error) {
    console.log("response====>",error);
    yield put(stopLoading({ id: EDIT_EVENT_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
    yield put(clearErrorNotification());
  }
}

export function* DeleteEvent(eventInput) {
  const {
    payload: { id },
  } = eventInput;
  yield put(startLoading({ id: DELETE_EVENT_LOADING_ID }));
  try {
    yield call(ApiReq.destroy, `/api/v1/events/${id}`);
    yield put(stopLoading({ id: DELETE_EVENT_LOADING_ID }));
    //dismiss loading
    yield put(stopLoading({ id: DELETE_EVENT_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: DELETE_EVENT_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* activateEvent(eventInput) {
  const {
    payload: { id },
  } = eventInput;
  yield put(startLoading({ id: ACTIVATE_EVENT_LOADING_ID }));
  try {
    yield call(ApiReq.patch, `/api/v1/events/activate/${id}`);
    yield put(stopLoading({ id: ACTIVATE_EVENT_LOADING_ID }));
    //dismiss loading
    yield put(stopLoading({ id: ACTIVATE_EVENT_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: ACTIVATE_EVENT_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* approveEvent(eventInput) {
  const {
    payload: { id },
  } = eventInput;
  yield put(startLoading({ id: APPROVE_EVENT_LOADING_ID }));
  try {
    yield call(ApiReq.patch, `/api/v1/events/approve/${id}`);
    yield put(stopLoading({ id: APPROVE_EVENT_LOADING_ID }));
    //dismiss loading
    yield put(stopLoading({ id: APPROVE_EVENT_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: APPROVE_EVENT_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* cancelEvent(eventInput) {
  const {
    payload: { id },
  } = eventInput;
  yield put(startLoading({ id: CANCEL_EVENT_LOADING_ID }));
  try {
    yield call(ApiReq.patch, `/api/v1/events/cancel/${id}`);
    yield put(stopLoading({ id: CANCEL_EVENT_LOADING_ID }));
    //dismiss loading
    yield put(stopLoading({ id: CANCEL_EVENT_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: CANCEL_EVENT_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}


export function* eventSaga() {
  yield takeLatest(CREATE_EVENT, createNewEvent);
  yield takeLatest(OWNER_CREATE_EVENT, ownerCreateNewEvent);
  yield takeLatest(GET_ALL_EVENTS, getEventsAction);
  yield takeLatest(GET_PENDING_EVENTS,getPendingEventsAction);
  yield takeLatest(GET_MY_EVENTS,getMyEventsAction);
  yield takeLatest(GET_ONE_EVENT, getOneEventAction);
  yield takeLatest(EDIT_EVENT, EditNewEvent);
  yield takeLatest(OWNER_EDIT_EVENT, ownerEditNewEvent);
  yield takeLatest(DELETE_EVENT, DeleteEvent);
  yield takeLatest(ACTIVATE_EVENT, activateEvent);
  yield takeLatest(CANCEL_EVENT, approveEvent);
  yield takeLatest(APPROVE_EVENT, cancelEvent);
  

}
