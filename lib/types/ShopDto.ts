import { ShopDesigns } from '../enums';

export type ShopDto = {
  title: string;
  description: string;
  design: ShopDesigns;
  products?: Product[];
};

export type Product = {
  title: string;
  description: string;
  imageUrls?: string[];
  quantity?: number;
  price?: {
    currency: string;
    value: number;
  };
  isActive: boolean;
  // product location (zip)
  // shipping terms (collection, shipping, price)
};
