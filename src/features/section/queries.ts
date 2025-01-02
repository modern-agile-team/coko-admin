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

      onMutate: async sectionOrderChange => {
        await queryClient.cancelQueries({ queryKey: sectionKeys.lists() });

        const previousSections = queryClient.getQueryData(
          sectionKeys.lists()
        ) as Section[];

        const sourceIndex = previousSections.findIndex(
          section => section.id === sectionOrderChange.id
        );

        const targetIndex = sectionOrderChange.order - 1;

        queryClient.setQueryData(sectionKeys.lists(), (old: Section[]) => {
          const updatedSections = [...old];
          const removedSection = updatedSections.splice(sourceIndex, 1);
          updatedSections.splice(targetIndex, 0, ...removedSection);
          return updatedSections;
        });

        return { previousSections };
      },
      onError: (err, newTodo, context) => {
        queryClient.setQueryData(
          sectionKeys.lists(),
          context?.previousSections
        );
      },
    });
  },
};

export default sectionsQueries;
