"use client";

import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeletion";
import { DOCUMENT_TYPE, documentTypeLabels } from "@/constants/document";
import { api } from "@/trpc/react";
import { columns } from "./columns";

const LegalDocumentsTable = () => {
  const { data, isLoading } =
    api.administrative.getAllLegalDocuments.useQuery();

  console.log(data);

  return (
    <div className="mt-6 w-full">
      {!isLoading && data ? (
        <DataTable
          columns={columns}
          data={data}
          filteredTitle="issuedBy"
          filteredColumn="documentType"
          options={
            DOCUMENT_TYPE.map((type) => ({
              label: documentTypeLabels[type],
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

export default LegalDocumentsTable;
