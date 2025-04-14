import React from "react";
import { columns, type Document } from "./columns";
import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeletion";
import { DocumentsOptionFilters } from "@/data/documents";

const data: Document[] = [
  {
    issuedBy: "Marissa123",
    docType: "Christian Ministry Policies and Procedures",
    docNumber: 43851,
    issueDate: new Date("2023-02-10"),
    expiryDate: new Date("2024-02-10"),
  },
  {
    issuedBy: "Columbres123",
    docType: "Legal Documents",
    docNumber: 43852,
    issueDate: new Date("2023-03-10"),
    expiryDate: new Date("2024-03-10"),
  },
];

const LegalDocumentsTable = () => {
  return (
    <div className="mt-6">
      {true ? (
        <DataTable
          columns={columns}
          data={data}
          filteredTitle="issuedBy"
          filteredColumn="docType"
          options={DocumentsOptionFilters}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default LegalDocumentsTable;
