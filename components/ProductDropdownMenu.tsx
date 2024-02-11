import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Doc, setDoc } from '@junobuild/core-peer';
import { useState } from 'react';
import { Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { ShopDto } from '@/lib/types';
import { LoadingSpinner } from './LoadingSpinner';
import { Sizes } from '@/lib/enums';

export interface ProductDropdownMenuProps {
  productId: string;
  shopData: Doc<ShopDto>;
  triggerElement: JSX.Element;
}

export const ProductDropdownMenu = ({
  productId,
  shopData,
  triggerElement,
}: ProductDropdownMenuProps) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setDeleteOpen(true);
    setLoading(true);
    const filteredProducts = shopData.data.products?.filter(
      (item) => item.id !== productId
    );
    const newShopData = {
      ...shopData.data,
      products: filteredProducts,
    };

    await setDoc<ShopDto>({
      collection: 'shops',
      doc: {
        ...shopData,
        data: newShopData,
      },
    }).finally(() => {
      setLoading(false);
      setDeleteOpen(false);
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{triggerElement}</DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* TODO: add edit option */}
          {/* TODO: add pause option */}
          <DropdownMenuItem
            className="gap-2"
            onClick={() => setDeleteOpen(!deleteOpen)}
          >
            <Trash className="w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {deleteOpen && (
        <AlertDialog open onOpenChange={() => setDeleteOpen(!deleteOpen)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this product?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                product and remove the data from the blockchain.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="flex gap-2 items-center"
                disabled={loading}
                onClick={handleDelete}
              >
                {loading && <LoadingSpinner size={Sizes.SM} />}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};
