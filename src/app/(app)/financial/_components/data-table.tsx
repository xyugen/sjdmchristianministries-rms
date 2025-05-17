"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeletion";
import { TRANSACTION_TYPE , TransactionTypeLabels } from "@/constants/transaction";
import { api } from "@/trpc/react";


const TransactionsTable = () => {

  const { data, isLoading } =
  api.finance.getAllFinancialTransactions.useQuery();

  return (
    <div className="mt-6">
      {!isLoading && data? (
        <DataTable
          columns={columns}
          data={data}
          filteredTitle="employeeName"
          filteredColumn="type"
          options={
            TRANSACTION_TYPE.map((type) => ({
              label: TransactionTypeLabels[type],
              value: type,
            })) || []
          }
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default TransactionsTable;
