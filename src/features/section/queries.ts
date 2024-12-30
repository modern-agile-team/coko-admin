import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { sectionOrderApi, sectionsApis } from './apis';

const sectionKeys = {
  all: ['sections'] as const,
  lists: () => [...sectionKeys.all, 'list'] as const,
};
export const sectionsQueries = {
  read: () => {
    return useQuery({
      queryKey: sectionKeys.lists(),
      queryFn: () => sectionsApis.get(),
    });
  },
  create: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: sectionsApis.post,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: sectionKeys.lists(),
        });
      },
    });
  },
  delete: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: sectionsApis.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: sectionKeys.lists(),
        });
      },
    });
  },
};

export const sectionQuery = {
  patch: () => {
    return useMutation({
      mutationFn: sectionOrderApi.patch,
    });
  },
};
