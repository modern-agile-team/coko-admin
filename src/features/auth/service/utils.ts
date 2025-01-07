import { AuthRequest } from '../types';

export const parseAuthRequestData = (
  partFormData: Record<string, FormDataEntryValue>
): AuthRequest => {
  return {
    email: partFormData.email.toString(),
    password: partFormData.password.toString(),
  };
};
