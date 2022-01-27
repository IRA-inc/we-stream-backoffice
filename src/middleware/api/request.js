import {normalize} from 'normalizr';
import {camelizeKeys, decamelizeKeys} from 'humps';
import * as qs from 'query-string';

import {ApiReq} from '../../api';

const request = async(url, schema, method, data) => {
  switch (method) {
    case 'POST':
    case 'PUT':
      try {
        const response = await ApiReq.request(method, url, data);
        const camelizedJson = camelizeKeys(response.data);
        return Object.assign({}, normalize(camelizedJson, schema))
      } catch (error) {
        return Promise.reject({message: 'ApiReq server error'})
      }
    case 'DELETE':
      try {
        const response = await ApiReq.destroy(url);
        const camelizedJson = camelizeKeys(response.data);
        return Object.assign({}, normalize(camelizedJson, schema))
      } catch (error) {
        return Promise.reject({message: 'ApiReq server error'})
      }
    default:
      try {
        const fullUrl = data
          ? `${url}/?${qs.stringify(decamelizeKeys(data))}`
          : url;
        const response = await ApiReq.get(fullUrl);
        const {data: responseData} = response.data;
        const camelizedJson = camelizeKeys(responseData || {});
        return Object.assign({}, normalize(camelizedJson, schema));
      } catch (error) {
        return Promise.reject({message: 'ApiReq server error'})
      }
  }
};

export default request;