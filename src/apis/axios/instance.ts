import axios from 'axios';
import queryString from 'query-string';
import {
  requestFunction,
  responseError,
  responseFunction,
} from './intercepter';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  paramsSerializer: params => {
    return queryString.stringify(params, {
      skipEmptyString: true,
      skipNull: true,
    });
  },
});
api.interceptors.request.use(requestFunction);
api.interceptors.response.use(responseFunction, responseError);
export default api;
