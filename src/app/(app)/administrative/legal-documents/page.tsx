import { type Metadata } from "next";
import * as React from "react";
import { columns, type Document } from "./_components/columns";
import { Separator } from "@/components/ui/separator";
import BreadcrumbLayout from "@/components/breadcrumb/page-breadcrumb";
import { DataTable } from "@/components/table/data-table";

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

const Page = () => {
  return (
    <div className="flex flex-col">
      <div className="flex text-center mt-1">
        <Separator orientation="vertical" className="mr-2.5 ml-1 h-5" />
        <BreadcrumbLayout currentPage="Legal Documents" parentPage="Administrative Records" />
      </div>

      <div className="container mx-auto py-8">
        <DataTable 
            columns={columns} 
            data={data} 
            filteredTitle="issued By"
            filteredColumn="docType"
            options={SampleDocuments}      
        />
      </div>
    </div>
  );
};

export default Page;
