import cosmeticItemApis from '@/features/item/apis';
import { useMutation, useQuery } from '@tanstack/react-query';
const cosmeticItemsKeys = {
  all: ['cosmeticItems'],
};
const cosmeticItemQueries = {
  read: () => {
    return useQuery({
      queryKey: cosmeticItemsKeys.all,
      queryFn: cosmeticItemApis.getItems,
    });
  },
  create: () => {
    return useMutation({
      mutationFn: cosmeticItemApis.postItem,
    });
  },
};
export default cosmeticItemQueries;
