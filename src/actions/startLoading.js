import {makeActionCreator} from '../utility';

export const START_LOADING = 'START_LOADING';
export const startLoading = makeActionCreator(START_LOADING, 'loaderData');