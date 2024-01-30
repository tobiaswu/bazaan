import { Designs } from '../enums';

export type ShopDto = {
  config: {
    title: string;
    description: string;
    design: Designs;
  };
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
