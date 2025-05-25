"use client";

import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeletion";
import { DOCUMENT_TYPE, documentTypeLabels } from "@/constants/document";
import { api } from "@/trpc/react";
import { columns } from "./columns";

const LegalDocumentsTable = () => {
  const { data, isLoading } =
    api.administrative.getAllLegalDocuments.useQuery();

  return (
    <div className="mt-6 w-full">
      {!isLoading && data ? (
        <DataTable
          // FIXME: column type error
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          columns={columns}
          data={data}
          filteredTitle="employeeName"
          filteredColumn="documentType"
          columnVisibility={{ documentFileName: false, documentFileId: false }}
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
