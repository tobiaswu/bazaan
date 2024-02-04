export type ProductDto = {
  shopId: string;
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
