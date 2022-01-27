import APIRequest from './request';

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.

const APIMiddleware = ({getState}) => (next) => async(action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let {endpoint} = callAPI;
  const {schema, types, method, data} = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(getState());
  }

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType,
    successType,
    failureType] = types;
  next(actionWith({type: requestType}));
  try {
    const response = await APIRequest(endpoint, schema, method, data);
    next(actionWith({type: successType, response}));
  } catch (error) {
    next(actionWith({type: failureType, errors: [error]}));
  }
};

export default APIMiddleware;