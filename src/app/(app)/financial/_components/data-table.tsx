import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeletion";
import { TransactionOption, type Transaction } from "@/constants/transaction";

const mockTransactions: Transaction[] = [
  {
    recordedById: "emp-001",
    type: "inflow",
    category: "offering",
    description: "Sunday service offering",
    amount: 1250.0,
    transactionDate: new Date("2023-04-16"),
    details: "Cash collection from main service",
  },
  {
    recordedById: "emp-002",
    type: "outflow",
    category: "utility_expense",
    description: "Electricity bill payment",
    amount: 350.75,
    transactionDate: new Date("2023-04-14"),
    details: "Monthly electricity bill for main building",
  },
  {
    recordedById: "emp-001",
    type: "inflow",
    category: "donation",
    description: "Anonymous donation",
    amount: 5000.0,
    transactionDate: new Date("2023-04-10"),
    details: "Anonymous donation for building fund",
  },
  {
    recordedById: "emp-003",
    type: "outflow",
    category: "ministry_expense",
    description: "Youth ministry supplies",
    amount: 275.5,
    transactionDate: new Date("2023-04-08"),
    details: "Supplies for youth retreat",
  },
  {
    recordedById: "emp-002",
    type: "inflow",
    category: "pledge",
    description: "Building fund pledge",
    amount: 1000.0,
    transactionDate: new Date("2023-04-05"),
    details: "Monthly pledge from Smith family",
  },
];

const TransactionsTable = () => {
  return (
    <div className="mt-6">
      {/* TODO: Replace with actual data and use the loading state */}
      {true ? (
        <DataTable
          columns={columns}
          data={mockTransactions}
          filteredTitle="recordedById"
          filteredColumn="type"
          options={TransactionOption}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default TransactionsTable;
