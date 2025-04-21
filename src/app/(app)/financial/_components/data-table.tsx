import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeletion";
import { TransactionOption, type Transaction } from "@/constants/transaction";
import { api } from "@/trpc/react";


const TransactionsTable = () => {

  const { data, isLoading } = 
  api.finance.getAllFinancialTransactions.useQuery();

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

