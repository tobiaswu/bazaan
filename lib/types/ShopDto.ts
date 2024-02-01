import { ShopDesigns } from '../enums';

export type ShopDto = {
  title: string;
  description: string;
  design: ShopDesigns;
  products?: Product[];
};

type Product = {
  id: string;
  title: string;
  description: string;
  price: {
    currency: string;
    value: number;
  };
};
