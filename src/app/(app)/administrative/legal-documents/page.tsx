import { type Metadata } from "next";
import * as React from "react";
import { columns, Document } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export const metadata: Metadata = {
  title: "Legal Documents",
};

const data: Document[] = [
  {
    id: "marissa123",
    title: "Christian Ministry Policies and Procedures",
    dateCreated: "2023-10-01",
    author: "Author Name",
    status: "Draft",
  },
  {
    id: "marissa123",
    title: "Employee Handbook",
    dateCreated: "2023-10-01",
    author: "Author Name",
    status: "Draft",
  },
  {
    id: "marissa123",
    title: "Meeting Agendas",
    dateCreated: "2023-10-01",
    author: "Author Name",
    status: "Draft",
  },
  {
    id: "marissa123",
    title: "Budget Report",
    dateCreated: "2023-10-01",
    author: "Author Name",
    status: "Draft",
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

