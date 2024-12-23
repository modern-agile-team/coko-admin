type category = 'clothes' | 'accessories' | 'profile' | 'color';
interface CosmeticItem {
  id?: number;
  name: string;
  cost: number;
  image: string;
  category: category;
}
export default CosmeticItem;
