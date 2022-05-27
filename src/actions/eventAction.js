import { makeActionCreator } from "../utility";
import {
  GET_ALL_EVENTS,
  GET_ONE_EVENT,
  EDIT_EVENT,
  DELETE_EVENT,
  CREATE_EVENT,
  GET_PENDING_EVENTS,
  GET_MY_EVENTS,
  ACTIVATE_EVENT,
  CANCEL_EVENT,
  APPROVE_EVENT,
  OWNER_CREATE_EVENT,
  OWNER_EDIT_EVENT,
  PAY_WITH_MOMO,
  PAY_WITH_CARDS,
  VERIFY_CARD_PAYMENT,
  SET_PAYMENT_RESPONSE
} from "./actionTypes";

export const createEvent = makeActionCreator(CREATE_EVENT, "payload");
export const ownerCreateEvent = makeActionCreator(
  OWNER_CREATE_EVENT,
  "payload"
);
export const getOneEvent = makeActionCreator(GET_ONE_EVENT, "payload");
export const getAllEvents = makeActionCreator(GET_ALL_EVENTS, "payload");
export const getMyEvents = makeActionCreator(GET_MY_EVENTS, "payload");
export const getPendingEvents = makeActionCreator(
  GET_PENDING_EVENTS,
  "payload"
);
export const activateEvent = makeActionCreator(ACTIVATE_EVENT, "payload");
export const approveEvent = makeActionCreator(CANCEL_EVENT, "payload");
export const cancelEvent = makeActionCreator(APPROVE_EVENT, "payload");
export const editEvent = makeActionCreator(EDIT_EVENT, "payload");
export const ownerEditEvent = makeActionCreator(OWNER_EDIT_EVENT, "payload");
export const deleteEventAction = makeActionCreator(DELETE_EVENT, "payload");
export const payWithMomo = makeActionCreator(PAY_WITH_MOMO, "payload");
export const payWithCards = makeActionCreator(PAY_WITH_CARDS, "payload");
export const verifyCardPayment = makeActionCreator(VERIFY_CARD_PAYMENT, "payload");
export const setPaymentResponse = makeActionCreator(SET_PAYMENT_RESPONSE, 'payload');
