import { ProductDto } from '.';
import { ShopDesigns } from '../enums';

export type ShopDto = {
  title: string;
  description: string;
  design: ShopDesigns;
  products?: ProductDto[];
};
