import cosmeticItemApis from '@/features/item/apis';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
const cosmeticItemsKeys = {
  all: ['cosmeticItems'],
};

export const useCosmeticItemQuery = {
  getCosmeticItems: () => {
    return useSuspenseQuery({
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
  upsertImage: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: cosmeticItemApis.putImage,
    });
  },
};
