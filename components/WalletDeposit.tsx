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

export interface WalletDepositProps {
  triggerElement: JSX.Element;
}

export const WalletDeposit = ({ triggerElement }: WalletDepositProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent className="min-w-fit">
        <DialogHeader>
          <DialogTitle>Deposit ICP</DialogTitle>
          <DialogDescription>
            Deposit ICP to this address to receive it in your account.
          </DialogDescription>
        </DialogHeader>
        <p>Address:</p>

        <DialogFooter>
          <Button>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
