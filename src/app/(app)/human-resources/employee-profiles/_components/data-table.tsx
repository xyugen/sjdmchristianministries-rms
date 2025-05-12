"use client";

import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeletion";
import { ROLES, RoleTypeLabels } from "@/constants/roles";
import { api } from "@/trpc/react";

const EmployeeTable = () => {
  const { data, isLoading } = api.humanResource.getAllEmployees.useQuery();

  return (
    <div className="mt-6">
      {!isLoading && data ? (
        <DataTable
          columns={columns}
          data={data}
          filteredTitle="ID"
          filteredColumn="roles"
          options={
            ROLES.map((type) => ({
              label: RoleTypeLabels[type],
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

export default EmployeeTable;
