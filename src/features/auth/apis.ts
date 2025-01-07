import api from '../../axios/instance';
import { AuthRequest } from './types';

export const authApis = {
  login: (params: AuthRequest) => api.post('/admins/login', params),
};
