import { useMutation, useQuery } from '@tanstack/react-query';
import { authApis } from './apis';

const authKeys = {
  all: ['user'],
  authentic: () => [...authKeys.all, 'authentic'],
};

export const authQueries = {
  useLogin: () => {
    return useMutation({
      mutationFn: authApis.login,
    });
  },
  useVerify: () => {
    return useQuery({
      queryKey: authKeys.authentic(),
      queryFn: authApis.verify,
    });
  },
};
