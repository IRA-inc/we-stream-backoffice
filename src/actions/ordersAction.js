import { makeActionCreator } from "../utility";
import {
  GET_ONWER_ORDERS,
} from "./actionTypes";

export const ownerEventOrders = makeActionCreator(GET_ONWER_ORDERS, "payload");

