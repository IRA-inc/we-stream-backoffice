import axios from 'axios';
import config from '../config';

const {AppBaseURL} = config;

const get = async(url, data, headers) => {
  return await request('GET', url, data, headers);
};

const put = async(url, data, headers) => {
  return await request('PUT', url, data, headers);
};

const post = async(url, data, headers) => {
  return await request('POST', url, data, headers);
};
const patch = async(url, data, headers) => {
  return await request('PATCH', url, data, headers);
};

const formPost = async(url, data, headers) => {
  return await formRequest('POST', url, data, headers);
};
const formPatch = async(url, data, headers) => {
  return await formRequest('PATCH', url, data, headers);
};

const destroy = async(url, data, headers) => {
  return await request('DELETE', url, data, headers);
};

const request = async(method, url, data, headers) => {
  const {jwtToken} = sessionStorage;

  return await axios({
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      Authorization: `Bearer ${jwtToken}`,
      ...headers
    },
    timeout: 3000000,
    method,
    data,
    url: AppBaseURL + url
  });
};
const formRequest = async(method, url, data, headers) => {
  const {jwtToken} = sessionStorage;

  return await axios({
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': '*/*',
      Authorization: `Bearer ${jwtToken}`,
      ...headers
    },
    timeout: 3000000,
    method,
    data,
    url: AppBaseURL + url
  });
};

export const ApiReq = {
  get,
  post,
  put,
  destroy,
  request,
  patch,
  formPost,
  formPatch
};
