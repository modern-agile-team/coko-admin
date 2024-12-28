import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import sectionsApis from './apis';

const sectionsQueries = {
  read: () => {
    return useQuery({
      queryKey: ['sections'],
      queryFn: () => sectionsApis.get(),
    });
  },
  create: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: sectionsApis.post,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['sections'],
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
          queryKey: ['sections'],
        });
      },
    });
  },
};
export default sectionsQueries;
