import { WalletDeposit } from '@/components/WalletDeposit';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';

export default function Wallet() {
  return (
    <div>
      <h1 className="font-bold text-2xl">Balances</h1>

      <Table className="mt-8">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Coin</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Value USD</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium flex items-center gap-1">
              <Image
                className="w-auto h-10"
                src="/icp-token-white.svg"
                alt="icp token"
                width={0}
                height={0}
              />
              ICP
            </TableCell>
            <TableCell>0</TableCell>
            <TableCell>0</TableCell>
            <TableCell className="text-right">
              <WalletDeposit
                triggerElement={<Button variant="link">DEPOSIT</Button>}
              />
              <Button disabled variant="link">
                WITHDRAW
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
