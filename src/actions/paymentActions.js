import { makeActionCreator } from "../utility";
import {
  ADD_PAYMENT,
  ALL_PAYMENT,
  ALL_PAYED_EVENT_PAYMENT,
  MY_ALL_PAYMENT,
  ALL_MY_EVENT_PAYMENT,
  ALL_PAYMENT_DETAILS,
  ALL_MY_PAYMENT_DETAILS,
} from "./actionTypes";

export const addPayments = makeActionCreator(ADD_PAYMENT, "payload");
export const allPayments = makeActionCreator(ALL_PAYMENT, "payload");
export const allEventPayments = makeActionCreator(ALL_PAYED_EVENT_PAYMENT, "payload");
export const allMyEventPayments = makeActionCreator(ALL_MY_EVENT_PAYMENT, "payload");
export const allMyPayments = makeActionCreator(MY_ALL_PAYMENT, "payload");
export const paymentsDetails = makeActionCreator(ALL_PAYMENT_DETAILS, "payload");
export const myPaymentsDetails =makeActionCreator(ALL_MY_PAYMENT_DETAILS, "payload");

