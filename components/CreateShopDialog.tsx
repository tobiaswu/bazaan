import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ShopDesignPicker } from './ShopDesignPicker';

export interface CreateShopDialogProps {
  triggerElement: JSX.Element;
}

export const CreateShopDialog = ({ triggerElement }: CreateShopDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your shop</DialogTitle>
          <DialogDescription>
            Set a name, a description and choose a design for your shop.
          </DialogDescription>
        </DialogHeader>
        <Input placeholder="Shop title" />
        <Textarea placeholder="Shop description" />
        <ShopDesignPicker />
        <DialogFooter>
          <Button type="submit">Create shop</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
