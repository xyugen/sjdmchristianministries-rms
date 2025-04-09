import { type Metadata } from "next";
import * as React from "react";
import { Separator } from "@/components/ui/separator";
import PageBreadCrumb from "@/components/breadcrumb/page-breadcrumb";
import LegalDocumentsTable from "./_components/data-table";

export const metadata: Metadata = {
  title: "Legal Documents",
};

const Page = () => {
  return (
    <div className="flex flex-col">
      <div className="flex text-center mt-1">
        <Separator orientation="vertical" className="mr-2.5 ml-1 h-5" />
        <PageBreadCrumb currentPage="Legal Documents" parentPage="Administrative Records" />
      </div>
      
      <LegalDocumentsTable/>
    </div>
  );
};

export default Page;
