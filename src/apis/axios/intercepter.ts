import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const requestFunction = (config: InternalAxiosRequestConfig<any>) => {
  console.log(config);
  return config;
};
const responseFunction = (config: AxiosResponse<any, any>) => {
  return config;
};
const responseError = (error: any) => {};
export { requestFunction, responseFunction, responseError };
