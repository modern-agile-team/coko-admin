import { useMutation } from '@tanstack/react-query';
import { authApis } from './apis';

export const authQueries = {
  useLogin: () => {
    return useMutation({
      mutationFn: authApis.login,
    });
  },
};
