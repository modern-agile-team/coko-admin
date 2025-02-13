import cosmeticItemApis from '@/features/item/apis';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const cosmeticItemsKeys = {
  all: ['cosmeticItems'],
};

export const useCosmeticItemQuery = {
  getCosmeticItems: () => {
    return useQuery({
      queryKey: cosmeticItemsKeys.all,
      queryFn: cosmeticItemApis.getItems,
    });
  },
  createCosmeticItem: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: cosmeticItemApis.postItem,
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: cosmeticItemsKeys.all });
      },
    });
  },
  updateCosmeticItem: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: cosmeticItemApis.updateItem,
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: cosmeticItemsKeys.all });
      },
    });
  },
};
