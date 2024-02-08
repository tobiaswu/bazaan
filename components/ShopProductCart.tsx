import { Product } from '@/lib/types';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { Separator } from './ui/separator';

export interface ShopProductCartProps {
  product: Product;
  triggerElement: JSX.Element;
}

export const ShopProductCart = ({
  product,
  triggerElement,
}: ShopProductCartProps) => {
  const [quantity, setQuantity] = useState(0);
  const totalPrice = quantity * (product.price?.value ?? 1);

  return (
    <Sheet>
      <SheetTrigger asChild>{triggerElement}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{product.title}</SheetTitle>
          <SheetDescription>{product.description}</SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-semibold">Price per unit</p>
            <div className="flex gap-2">
              <p>{product.price?.value ?? 1}</p>
              <p>{product.price?.currency ?? 'ICP'}</p>
            </div>
          </div>

          <div>
            <p className="font-semibold">Select quantity</p>
            <Input
              type="number"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <div>
            <p className="text-lg font-bold">Total price</p>
            <div className="flex gap-2">
              <p>{totalPrice}</p>
              <p>{product.price?.currency ?? 'ICP'}</p>
            </div>
          </div>

          <Button className="justify-center mt-4" type="submit">
            Send Order
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
