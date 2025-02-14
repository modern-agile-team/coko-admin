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
