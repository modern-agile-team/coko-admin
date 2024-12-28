import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
const status: { [key: number]: string } = {
  400: '데이터필드를 확인해주세용',
  404: '페이지를 찾을 수 없습니다.',
  500: '서버 오류가 발생했습니다.',
};

const requestFunction = (config: InternalAxiosRequestConfig<any>) => {
  return config;
};
const responseFunction = (config: AxiosResponse<any, any>) => {
  return config;
};
const responseError = (error: AxiosError) => {
  if (error.response?.status) {
    const message = status[error.response.status];
    if (message) {
      error.message = message;
    }
  }
  return Promise.reject(error);
};
export { requestFunction, responseFunction, responseError };
