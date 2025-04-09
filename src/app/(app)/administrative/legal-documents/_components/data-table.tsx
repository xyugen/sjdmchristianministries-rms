import React from "react";
import { columns, type Document } from "./columns";
import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeletion";

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

//Sample options
const SampleDocuments = [
  {
    label: "Christian Ministry Policies and Procedures",
    value: "Christian Ministry Policies and Procedures",
  },
  {
    label: "Legal Document",
    value: "Legal Document",
  },
];

const LegalDocumentsTable = () => {
  return (
    <div>
      {false ? (
        <DataTable
          columns={columns}
          data={data}
          filteredTitle="issuedBy"
          filteredColumn="docType"
          options={SampleDocuments}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default LegalDocumentsTable;
