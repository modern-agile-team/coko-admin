import api from '@/axios/instance';
import { CosmeticItem } from '@/features/item/types';

const cosmeticItemApis = {
  getItems: async (): Promise<CosmeticItem[]> => {
    const response = await api.get('/items');
    return response.data;
  },
  postItem: async (cosmeticItem: Omit<CosmeticItem, 'id'>): Promise<void> => {
    return await api.post('/items', cosmeticItem);
  },
  updateItem: async (params: CosmeticItem): Promise<void> => {
    const { id, ...rest } = params;
    return await api.patch(`items/${id}`, rest);
  },
};

export default cosmeticItemApis;
