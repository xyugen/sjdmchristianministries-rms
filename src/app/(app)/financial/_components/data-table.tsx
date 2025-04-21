"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeletion";
import { TransactionOption } from "@/constants/transaction";
import { api } from "@/trpc/react";


const TransactionsTable = () => {

  const { data, isLoading, error } = 
  api.finance.getAllFinancialTransactions.useQuery();

  console.log(data);
  console.log(error);

  return (
    <div className="mt-6">
      {/* TODO: Replace with actual data and use the loading state */}
      {!isLoading && data? (
        <DataTable
          columns={columns}
          data={data}
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

