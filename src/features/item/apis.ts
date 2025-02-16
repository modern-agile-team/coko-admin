import api from '@/axios/instance';
import { LIMIT } from '@/features/item/constants';
import { CosmeticItem, CosmeticItemQuery } from '@/features/item/types';
import {
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';

const cosmeticItemApis = {
  getItems: async (params?: CosmeticItemQuery): Promise<CosmeticItem[]> => {
    const response = await api.get('/items', {
      params: { ...params, limit: LIMIT },
    });
    return response.data.contents;
  },
  postItem: async (cosmeticItem: Omit<CosmeticItem, 'id'>): Promise<void> => {
    return await api.post('/items', cosmeticItem);
  },
  patchItem: async (params: CosmeticItem): Promise<void> => {
    const { id, ...rest } = params;
    return await api.patch(`items/${id}`, rest);
  },
  putImage: async (file: File): Promise<PutObjectCommandOutput> => {
    const s3Client = new S3Client({
      region: import.meta.env.VITE_AWS_REGION,
      credentials: {
        accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
      },
    });
    const params = {
      Bucket: 'coko-s3',
      Key: file.name,
      Body: file,
      ContentDisposition: 'inline',
      ContentType: file.type,
    };
    const command = new PutObjectCommand(params);

    return await s3Client.send(command);
  },
};

export default cosmeticItemApis;
