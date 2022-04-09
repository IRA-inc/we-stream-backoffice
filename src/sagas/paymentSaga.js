import { takeLatest, put, call } from "redux-saga/effects";
import { ApiReq } from "../api";
import {
  PAY_WITH_MOMO_LOADING_ID,
  PAY_WITH_CARD_LOADING_ID,
  VERIFY_CARD_LOADING_ID,
  ADD_PAYMENT_LOADING_ID,
  ALL_PAYMENT_LOADING_ID
} from "../constants/loaders";
import {
  PAY_WITH_MOMO,
  PAY_WITH_CARDS,
  VERIFY_CARD_PAYMENT,
  ALL_PAYMENT,
  ADD_PAYMENT,
  SET_PAYMENT_RESPONSE,
  setNotificationMessage,
  setErrorNotification,
  clearNotificationMessage,
  clearErrorNotification,
  startLoading,
  stopLoading,
  DISPLAY_ALL_DATA,
} from "../actions";
import { isEmpty } from "lodash";
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

export function* PaymentsSaga() {
  yield takeLatest(PAY_WITH_MOMO, reqToPayWithMoMo);
  yield takeLatest(PAY_WITH_CARDS, reqToPayWithCard);
  yield takeLatest(VERIFY_CARD_PAYMENT, verifyCardPayment);
  yield takeLatest(ADD_PAYMENT,addPaymentAction)
  yield takeLatest(ALL_PAYMENT,getpaymentsAction)
}
