import {makeActionCreator} from '../utility';

export const HANDLE_HTTP_ERROR = 'HANDLE_HTTP_ERROR';
export const handleHTTPError = makeActionCreator(HANDLE_HTTP_ERROR, 'response');