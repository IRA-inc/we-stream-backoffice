import {createReducer} from './../utility';

export const currentUser = createReducer({}, {
  'SET_CURRENT_USER'(_state, {payload}) {
    return payload;
  },
  'SIGN_OUT_USER'() {
    // sessionStorage.removeItem('jwtToken')
    return {};
  }
});
