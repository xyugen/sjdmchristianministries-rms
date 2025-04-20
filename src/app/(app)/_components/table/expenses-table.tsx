import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export interface ExpenseItem {
  id: string;
  name: string;
  type: string;
  amount: string;
  date: string;
}

interface ExpensesTableProps {
  expenses: ExpenseItem[];
  className?: string;
}

const ExpensesTable = ({ expenses, className }: ExpensesTableProps) => {
  return (
    <Table className={className}>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.id} className="border-b">
            <TableCell className="py-4">
              <div className="font-medium">{expense.name}</div>
              <div className="text-sm text-muted-foreground">
                {expense.type}
              </div>
            </TableCell>
            <TableCell className="py-4 text-right font-medium">
              <div className="inline-block rounded-md bg-muted px-3 py-1">
                {expense.amount}
              </div>
            </TableCell>
            <TableCell className="py-4 text-right text-muted-foreground">
              {expense.date}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExpensesTable;
