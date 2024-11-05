import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import sectionsApis from '../apis/sections';

const sectionsQueries = {
  read: () => {
    return useQuery({
      queryKey: ['sections'],
      queryFn: () => sectionsApis.getSections(),
    });
  },
  create: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: sectionsApis.postSections,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['sections'],
        });
      },
    });
  },
  update: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: sectionsApis.putSection,
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
      mutationFn: sectionsApis.deleteSection,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['sections'],
        });
      },
    });
  },
};
export default sectionsQueries;
