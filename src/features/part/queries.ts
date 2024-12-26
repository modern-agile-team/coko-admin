import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import partsApis from './apis';
import { Part } from './types';

const partsQueries = {
  read: () => {
    return useQuery<Part[]>({
      queryKey: ['parts'],
      queryFn: partsApis.getParts,
    });
  },
  create: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: partsApis.postParts,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['parts'],
        });
      },
    });
  },
  update: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: partsApis.putPart,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['parts'],
        });
      },
    });
  },
  delete: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: partsApis.deletePart,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['parts'],
        });
      },
    });
  },
};
export default partsQueries;
