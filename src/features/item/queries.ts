import cosmeticItemApis from '@/features/item/apis';
import { CosmeticItemQuery } from '@/features/item/types';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
const cosmeticItemKeys = {
  all: ['cosmeticItems'],
  categoryOnly: () => [...cosmeticItemKeys.all, 'category'] as const,
  category: (category?: CosmeticItemQuery) =>
    [...cosmeticItemKeys.categoryOnly(), category] as const,
};

export const useCosmeticItemQuery = {
  getCosmeticItems: (params?: CosmeticItemQuery) => {
    return useSuspenseQuery({
      queryKey: cosmeticItemKeys.category(params),
      queryFn: () => cosmeticItemApis.getItems(params),
    });
  },
  createCosmeticItem: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: cosmeticItemApis.postItem,
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: cosmeticItemKeys.all });
      },
    });
  },
  updateCosmeticItem: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: cosmeticItemApis.updateItem,
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: cosmeticItemKeys.all });
      },
    });
  },
  upsertImage: () => {
    return useMutation({
      mutationFn: cosmeticItemApis.putImage,
    });
  },
};
