import {createReducer} from './../utility';

export const loader = createReducer({}, {
  'UPDATE_LOADER'(state , {data}) {
    return {...state, ...data};
  },
  'CLEAR_LOADER'() {
    return {};
  }
});