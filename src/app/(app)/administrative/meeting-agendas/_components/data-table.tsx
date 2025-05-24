"use client";

import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeletion";
import { api } from "@/trpc/react";
import { columns } from "./columns";

const MeetingAgendasTable = () => {
  const { data, isLoading, refetch } =
    api.administrative.getAllMeetingAgendas.useQuery();

  return (
    <div className="mt-6 w-full">
      {!isLoading && data ? (
        <DataTable
          columns={columns}
          data={data}
          filteredTitle="agenda"
          refetch={refetch}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default MeetingAgendasTable;
