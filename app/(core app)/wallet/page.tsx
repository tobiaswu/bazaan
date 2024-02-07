import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
            <TableCell className="font-medium">
              {/* Logo */}
              ICP
            </TableCell>
            <TableCell>0</TableCell>
            <TableCell>0</TableCell>
            <TableCell className="text-right">
              <Button variant="link">DEPOSIT</Button>
              <Button variant="link">WITHDRAW</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
