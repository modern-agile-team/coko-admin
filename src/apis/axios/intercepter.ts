import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const requestFunction = (config: InternalAxiosRequestConfig<any>) => {
  console.log(config.data);
  return config;
};
const responseFunction = (config: AxiosResponse<any, any>) => {
  console.log(config);
  return config;
};
const responseError = (error: any) => {
  console.log(error);
};
export { requestFunction, responseFunction, responseError };
