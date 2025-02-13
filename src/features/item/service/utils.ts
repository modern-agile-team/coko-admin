import { CosmeticItem } from '@/features/item/types';
import { isImage } from '@/utils/validator';

export const parseCosmeticItemData = (
  cosmeticItemFormData: Record<string, FormDataEntryValue>
): Omit<CosmeticItem, 'id' | 'image'> => {
  return {
    mainCategoryId: Number(cosmeticItemFormData.mainCategory_id),
    name: cosmeticItemFormData.item_name.toString(),
    price: Number(cosmeticItemFormData.item_price),
    subCategoryId: Number(cosmeticItemFormData.subCategory_id),
  };
};

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export const s3uploadFile = async (file: File) => {
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
  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
