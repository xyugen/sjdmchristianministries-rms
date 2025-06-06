"use client";

import { Badge } from "@/components/ui/badge";
import type { TRANSACTION_CATEGORY } from "@/constants/transaction";
import { cn } from "@/lib/utils";
import type { InferSelectModel } from "@/server/db";
import type { financialTransactions } from "@/server/db/schema";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableRowActions } from "./table-row-actions";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
};
type Transaction = InferSelectModel<typeof financialTransactions>;

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    enableHiding: true,
  },
  {
    accessorKey: "recordedById",
    enableHiding: true,
  },
  {
    accessorKey: "employeeName",
    header: "Recorded By",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ getValue }) => {
      const categoryLabels: Record<
        (typeof TRANSACTION_CATEGORY)[number],
        string
      > = {
        offering: "Offering",
        pledge: "Pledge",
        donation: "Donation",
        representation_expense: "Representation Expense",
        utility_expense: "Utility Expense",
        ministry_expense: "Ministry Expense",
        pastoral_expense: "Pastoral Expense",
      };

      const value = getValue() as (typeof TRANSACTION_CATEGORY)[number];
      return <div className="font-medium">{categoryLabels[value]}</div>;
    },
  },
  {
    accessorKey: "transactionDate",
    header: "Transaction Date",
    cell: ({ getValue }) => {
      const rawDate = new Date(getValue() as string);
      const formattedDate = format(new Date(rawDate), "MMM d, yyyy");
      return formattedDate;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ getValue }) => {
      const description = getValue() as string;

      return <div className="font-medium">{description}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ getValue }) => {
      return (
        <Badge
          className={cn("w-16 text-nowrap text-center")}
          variant={getValue() === "inflow" ? "green" : "destructive"}
        >
          {getValue() === "inflow" ? "Inflow" : "Outflow"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row, getValue }) => {
      const value = row.getValue("type");

      return (
        <div
          className={`${value === "inflow" ? "text-green-700" : "text-red-600"} text-nowrap`}
        >
          {value === "inflow" ? "+ " : "- "}
          {formatCurrency(getValue() as number)}
        </div>
      );
    },
  },
  {
    accessorKey: "details",
    header: "Details",
  },
  {
    id: "actions",
    cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
  },
];
