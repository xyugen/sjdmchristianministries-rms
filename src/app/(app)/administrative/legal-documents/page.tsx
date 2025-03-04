import { type Metadata } from "next";
import * as React from "react";
import { columns, type Document } from "./_components/columns";
import { DataTable } from "./_components/data-table";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

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
      <div className="flex text-center mt-1">
        <Separator orientation="vertical" className="mr-2.5 ml-1 h-5" />
        <Breadcrumb>
          <BreadcrumbList className="flex items-center">
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbPage className="text-muted-foreground">All Inboxes</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Inbox</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mx-auto py-8">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Page;
