import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const requestFunction = (config: InternalAxiosRequestConfig<any>) => {
  return config;
};
const responseFunction = (config: AxiosResponse<any, any>) => {
  return config;
};
const responseError = (error: any) => {};
export { requestFunction, responseFunction, responseError };
