import { makeActionCreator } from "../utility";
import {
  ADD_PAYMENT,
  ALL_PAYMENT
} from "./actionTypes";

export const addPayments = makeActionCreator(ADD_PAYMENT, "payload");
export const allPayments = makeActionCreator(ALL_PAYMENT, "payload");

