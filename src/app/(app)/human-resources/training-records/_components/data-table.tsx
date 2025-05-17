"use client";

import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeletion";
import { api } from "@/trpc/react";

const EmployeeTrainingTable = () => {
  const { data, isLoading } =
    api.humanResource.getAllEmployeeTrainings.useQuery();

  return (
    <div className="mt-6">
      {!isLoading && data ? (
        <DataTable
          columns={columns}
          data={data}
          filteredTitle="id"
          filteredColumn="role"
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default EmployeeTrainingTable;
