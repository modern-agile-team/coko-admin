import { AxiosResponse } from 'axios';
import api from '../../axios/instance';
import { AuthRequest } from './types';

export const authApis = {
  login: async (params: AuthRequest): Promise<AxiosResponse> =>
    await api.post('/admins/login', params),
  verify: async (): Promise<AxiosResponse> => await api.get('/admins/verify'),
};
