export interface CosmeticItem {
  id: number;
  name: string;
  price: number;
  image: string;
  mainCategoryId: number;
  subCategoryId: number;
}

export type CosmeticItemQuery = {
  mainCategoryId?: number;
  subCategoryId?: number | null;
};
