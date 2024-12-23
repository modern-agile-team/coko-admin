import api from '@/apis/axios/instance';
import CosmeticItem from '@/types/CosmeticlItem';

const cosmeticItemApis = {
  getItems: async (): Promise<CosmeticItem[]> => {
    const response = await api.get('/items');
    return response.data;
  },
};
export default cosmeticItemApis;
