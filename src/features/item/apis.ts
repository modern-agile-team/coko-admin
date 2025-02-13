import api from '@/axios/instance';
import { CosmeticItem } from '@/features/item/types';

const cosmeticItemApis = {
  getItems: async (): Promise<CosmeticItem[]> => {
    const response = await api.get('/items');
    return response.data;
  },
  postItem: async (cosmeticItem: CosmeticItem): Promise<void> => {
    await api.post('/items', cosmeticItem);
  },
};
export default cosmeticItemApis;
