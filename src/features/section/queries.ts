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

      onMutate: async changeOrder => {
        await queryClient.cancelQueries({ queryKey: sectionKeys.lists() });

        const previousSections = queryClient.getQueryData(
          sectionKeys.lists()
        ) as Section[];

        const indexById = previousSections.findIndex(
          item => item.id === changeOrder.id
        );
        const indexByOrder = changeOrder.order - 1;

        queryClient.setQueryData(sectionKeys.lists(), (old: Section[]) => {
          const temp = old[indexById];
          old[indexById] = {
            ...old[indexByOrder],
            order: old[indexById].order,
          };

          old[indexByOrder] = { ...temp, order: old[indexByOrder].order };

          return [...old];
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
