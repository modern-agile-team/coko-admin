import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import sectionsApis from './apis';
import { Section } from './types';

const sectionKeys = {
  all: ['sections'] as const,
  lists: () => [...sectionKeys.all, 'list'] as const,
};
const sectionsQueries = {
  getSections: () => {
    return useQuery({
      queryKey: sectionKeys.lists(),
      queryFn: sectionsApis.getSections,
      enabled: true,
    });
  },
  createSection: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: sectionsApis.createSection,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: sectionKeys.lists(),
        });
      },
    });
  },
  deleteSection: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: sectionsApis.deleteSection,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: sectionKeys.lists(),
        });
      },
    });
  },
  updateSectionOrder: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: sectionsApis.updateSectionOrder,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: sectionKeys.lists(),
          refetchType: 'all',
        });
      },
    });
  },
};

export default sectionsQueries;
