import {makeActionCreator} from '../utility';

export const STOP_LOADING = 'STOP_LOADING';
export const stopLoading = makeActionCreator(STOP_LOADING, 'loaderData');