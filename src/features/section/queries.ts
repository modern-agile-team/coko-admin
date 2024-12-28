import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import sectionsApis from './apis';
const sectionKeys = {
  all: ['sections'] as const,
  lists: () => [...sectionKeys.all, 'list'] as const,
};
const sectionsQueries = {
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
export default sectionsQueries;
