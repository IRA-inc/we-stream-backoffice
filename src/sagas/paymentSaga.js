import { takeLatest, put, call } from "redux-saga/effects";
import { ApiReq } from "../api";
import {
  PAY_WITH_MOMO_LOADING_ID,
  PAY_WITH_CARD_LOADING_ID,
  VERIFY_CARD_LOADING_ID,
  ADD_PAYMENT_LOADING_ID,
  ALL_PAYMENT_LOADING_ID,
  ALL_PAYED_EVENT_PAYMENT_LOADING_ID,
  MY_ALL_PAYMENT_LOADING_ID,
  ALL_MY_EVENT_PAYMENT_LOADING_ID,
  ALL_PAYMENT_DETAILS_LOADING_ID,
  ALL_MY_PAYMENT_DETAILS_LOADING_ID
} from "../constants/loaders";
import {
  PAY_WITH_MOMO,
  PAY_WITH_CARDS,
  VERIFY_CARD_PAYMENT,
  ALL_PAYMENT,
  ADD_PAYMENT,
  DISPLAY_PAYED_EVENT_PAYMENT,
  ALL_PAYED_EVENT_PAYMENT,
  DISPLAY_MY_PAYED_EVENT_PAYMENT,
  DISPLAY_MY_EVENT_PAYMENT,
  ALL_MY_EVENT_PAYMENT,
  MY_ALL_PAYMENT,
  DISPLAY_PAYMENT_DETAILS,
  ALL_PAYMENT_DETAILS,
  SET_PAYMENT_RESPONSE,
  ALL_MY_PAYMENT_DETAILS,
  DISPLAY_MY_PAYMENT_DETAILS,
  setNotificationMessage,
  setErrorNotification,
  clearNotificationMessage,
  clearErrorNotification,
  startLoading,
  stopLoading,
  DISPLAY_ALL_DATA,
} from "../actions";

import { actionType } from "../utility/makeActionCreator";
// import toast from 'react-hot-toast';
// import responseComponent from "../helpers/responseComponent";

// const { ErrorResponse, SuccessResponse } = responseComponent;

export function* reqToPayWithMoMo(momoPayload) {
  const {
    payload: { amount, phoneNumber, seats, eventId },
  } = momoPayload;

  try {
    yield put(startLoading({ id: PAY_WITH_MOMO_LOADING_ID }));

    const response = yield call(ApiReq.post, "/api/v1/payments/momopayevent", {
      amount,
      phoneNumber,
      seats,
      eventId,
    });
    if (response.data.message) {
      yield put(setNotificationMessage(response.data.message));
    } else {
      yield put(setErrorNotification(response.data.Error));
    }
    // dismiss loading
    yield put(stopLoading({ id: PAY_WITH_MOMO_LOADING_ID }));
    yield put(clearNotificationMessage());
  } catch (error) {
    yield put(stopLoading({ id: PAY_WITH_MOMO_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
    yield put(clearErrorNotification());
  }
}

export function* reqToPayWithCard(cardPayload) {
  const {
    payload: { amount, phoneNumber, name, email, eventId },
  } = cardPayload;

  try {
    yield put(startLoading({ id: PAY_WITH_CARD_LOADING_ID }));

    const response = yield call(ApiReq.post, "/api/v1/payments/cardpayevent", {
      amount,
      phoneNumber,
      name,
      email,
      eventId,
    });

    if (response.data.message || response.data.checkoutLink) {
      yield put(actionType(SET_PAYMENT_RESPONSE, response.data));
      yield put(setNotificationMessage(response.data.message));
    } else {
      yield put(setErrorNotification(response.data.Error));
    }
    // dismiss loading
    yield put(stopLoading({ id: PAY_WITH_CARD_LOADING_ID }));
    yield put(clearNotificationMessage());
  } catch (error) {
    yield put(stopLoading({ id: PAY_WITH_CARD_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
    yield put(clearErrorNotification());
  }
}

export function* verifyCardPayment(verifyCardPayload) {
  const {
    payload: { eventId, status, tx_ref, transaction_id },
  } = verifyCardPayload;

  try {
    yield put(startLoading({ id: VERIFY_CARD_LOADING_ID }));

    const response = yield call(ApiReq.post, "/api/v1/payments/verifycardpayevent", {
      eventId,
      status,
      tx_ref,
      transaction_id,
    });
  if (response.data.message) {
    yield put(setNotificationMessage(response.data.message));
  } else {
    yield put(setErrorNotification(response.data.Error));
  }
  // dismiss loading
  yield put(stopLoading({ id: VERIFY_CARD_LOADING_ID }));
  yield put(clearNotificationMessage());
} catch (error) {
  yield put(stopLoading({ id: VERIFY_CARD_LOADING_ID }));
  yield put(setErrorNotification(error.response.data.Error));
  yield put(clearErrorNotification());
}
}

export function* addPaymentAction(payment) {
  const {
    payload: { eventId, amount, transaction_id },
  } = payment;

  try {
    yield put(startLoading({ id: ADD_PAYMENT_LOADING_ID }));

    const response = yield call(ApiReq.post, "/api/v1/payments", {
      eventId,
      amount,
      transaction_id,
    });
  if (response.data.message) {
    yield put(setNotificationMessage(response.data.message));
  } else {
    yield put(setErrorNotification(response.data.Error));
  }
  // dismiss loading
  yield put(stopLoading({ id: ADD_PAYMENT_LOADING_ID }));
  yield put(clearNotificationMessage());
} catch (error) {
  yield put(stopLoading({ id: ADD_PAYMENT_LOADING_ID }));
  yield put(setErrorNotification(error.response.data.Error));
  yield put(clearErrorNotification());
}
}

export function* getpaymentsAction(searchInput) {
  const {
    payload: { search,page },
  } = searchInput;

  yield put(startLoading({ id: ALL_PAYMENT_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/payments?search=${search}&page=${page}`);
    yield put(stopLoading({ id: ALL_PAYMENT_LOADING_ID }));

    yield put(actionType(DISPLAY_ALL_DATA, response.data));

    yield put(stopLoading({ id: ALL_PAYMENT_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: ALL_PAYMENT_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* getEventPaymentsAction(searchInput) {
  const {
    payload: { search,page },
  } = searchInput;

  yield put(startLoading({ id: ALL_PAYED_EVENT_PAYMENT_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/payments/events?search=${search}&page=${page}`);
    yield put(stopLoading({ id: ALL_PAYED_EVENT_PAYMENT_LOADING_ID }));

    yield put(actionType(DISPLAY_PAYED_EVENT_PAYMENT, response.data));

    yield put(stopLoading({ id: ALL_PAYED_EVENT_PAYMENT_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: ALL_PAYED_EVENT_PAYMENT_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* getMyEventPaymentsAction(searchInput) {
  const {
    payload: { search,page },
  } = searchInput;

  yield put(startLoading({ id: ALL_MY_EVENT_PAYMENT_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/payments/myevents?search=${search}&page=${page}`);
    yield put(stopLoading({ id: ALL_MY_EVENT_PAYMENT_LOADING_ID }));

    yield put(actionType(DISPLAY_MY_PAYED_EVENT_PAYMENT, response.data));

    yield put(stopLoading({ id: ALL_MY_EVENT_PAYMENT_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: ALL_MY_EVENT_PAYMENT_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* getMyPaymentsAction(searchInput) {
  const {
    payload: { search,page },
  } = searchInput;

  yield put(startLoading({ id: MY_ALL_PAYMENT_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/payments/mypayments?search=${search}&page=${page}`);
    yield put(stopLoading({ id: MY_ALL_PAYMENT_LOADING_ID }));

    yield put(actionType(DISPLAY_MY_EVENT_PAYMENT, response.data));

    yield put(stopLoading({ id: MY_ALL_PAYMENT_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: MY_ALL_PAYMENT_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* getMyPaymentsDetailsAction(searchInput) {
  const {
    payload: {id,page },
  } = searchInput;

  yield put(startLoading({ id: ALL_MY_PAYMENT_DETAILS_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/payments/mypayments/${id}?page=${page}`);
    yield put(stopLoading({ id: ALL_MY_PAYMENT_DETAILS_LOADING_ID }));

    yield put(actionType(DISPLAY_MY_PAYMENT_DETAILS, response.data));

    yield put(stopLoading({ id: ALL_MY_PAYMENT_DETAILS_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: ALL_MY_PAYMENT_DETAILS_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* getPaymentsDetailsAction(searchInput) {
  const {
    payload: {id,page },
  } = searchInput;

  yield put(startLoading({ id: ALL_PAYMENT_DETAILS_LOADING_ID }));
  try {
    const response = yield call(ApiReq.get, `/api/v1/payments/${id}?page=${page}`);
    yield put(stopLoading({ id: ALL_PAYMENT_DETAILS_LOADING_ID }));

    yield put(actionType(DISPLAY_PAYMENT_DETAILS, response.data));

    yield put(stopLoading({ id: ALL_PAYMENT_DETAILS_LOADING_ID }));
  } catch (error) {
    yield put(stopLoading({ id: ALL_PAYMENT_DETAILS_LOADING_ID }));
    yield put(setErrorNotification(error.response.data.Error));
  }
}

export function* PaymentsSaga() {
  yield takeLatest(PAY_WITH_MOMO, reqToPayWithMoMo);
  yield takeLatest(PAY_WITH_CARDS, reqToPayWithCard);
  yield takeLatest(VERIFY_CARD_PAYMENT, verifyCardPayment);
  yield takeLatest(ADD_PAYMENT,addPaymentAction)
  yield takeLatest(ALL_PAYMENT,getpaymentsAction)
  yield takeLatest(ALL_PAYED_EVENT_PAYMENT,getEventPaymentsAction)
  yield takeLatest(ALL_MY_EVENT_PAYMENT,getMyEventPaymentsAction)
  yield takeLatest(MY_ALL_PAYMENT,getMyPaymentsAction)
  yield takeLatest(ALL_PAYMENT_DETAILS, getPaymentsDetailsAction)
  yield takeLatest(ALL_MY_PAYMENT_DETAILS, getMyPaymentsDetailsAction)
}
