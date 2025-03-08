import { type Metadata } from "next";
import * as React from "react";
import { columns, Document } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export const metadata: Metadata = {
  title: "Legal Documents",
};

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

const Page = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">Legal Documents</h1>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Page;

