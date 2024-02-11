import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Doc, deleteDoc } from '@junobuild/core-peer';
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

export interface ShopDropdownMenuProps {
  shop: Doc<ShopDto>;
  triggerElement: JSX.Element;
}

export const ShopDropdownMenu = ({
  shop,
  triggerElement,
}: ShopDropdownMenuProps) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    await deleteDoc<ShopDto>({
      collection: 'shops',
      doc: shop,
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
          <DropdownMenuItem
            className="gap-2"
            onClick={(e) => {
              e.preventDefault();
              setDeleteOpen(!deleteOpen);
            }}
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
                Are you sure you want to delete this shop?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                shop, all its products and remove the data from the blockchain.
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
