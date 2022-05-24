import {
  DISPLAY_ALL_DATA,
  ALL_PAYED_EVENT_PAYMENT,
  DISPLAY_MY_PAYED_EVENT_PAYMENT,
  DISPLAY_MY_EVENT_PAYMENT,
  DISPLAY_PAYMENT_DETAILS,
  DISPLAY_MY_PAYMENT_DETAILS
} from "../actions";

const initialState = {
  payments: [],
  mypayments: [],
  eventPayments: [],
  myEventPayments: [],
  eventPaymentsDetails: [],
  myEventPaymentsDetails: [],
};

export const payments = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_ALL_DATA:
      return { ...state, payments: action.payload };
    case DISPLAY_MY_EVENT_PAYMENT:
      return { ...state, mypayments: action.payload };
    case ALL_PAYED_EVENT_PAYMENT:
      return { ...state, eventPayments: action.payload };
    case DISPLAY_MY_PAYED_EVENT_PAYMENT:
      return { ...state, myEventPayments: action.payload };
    case DISPLAY_PAYMENT_DETAILS:
      return { ...state, eventPaymentsDetails: action.payload };
    case DISPLAY_MY_PAYMENT_DETAILS:
      return { ...state, myEventPaymentsDetails: action.payload };
    default:
      return state;
  }
};
