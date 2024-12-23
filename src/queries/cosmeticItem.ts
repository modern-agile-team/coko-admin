import cosmeticItemApis from '@/apis/cosmeticItems';
import { useQuery } from '@tanstack/react-query';
const cosmeticItemsKeys = {
  all: ['cosmeticItems'],
};
const cosmeticItemQueries = {
  get: () => {
    return useQuery({
      queryKey: cosmeticItemsKeys.all,
      queryFn: cosmeticItemApis.getItems,
    });
  },
};
export default cosmeticItemQueries;
