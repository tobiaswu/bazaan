import { ShopDesigns } from '../enums';

export type ShopDto = {
  title: string;
  description: string;
  design: ShopDesigns;
  products?: Product[];
};

export type Product = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  quantity: number;
  currency: string;
  price: string;
  // TODO: add product location (zip)
  // TODO: add shipping terms (collection, delivery, price)
};
