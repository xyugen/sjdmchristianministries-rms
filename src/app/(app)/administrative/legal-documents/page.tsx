import { type Metadata } from "next";
import * as React from "react";
import { Separator } from "@/components/ui/separator";
import PageBreadCrumb from "@/components/breadcrumb/page-breadcrumb";
import LegalDocumentsTable from "./_components/data-table";
import Header from "./_components/table-header";

export const metadata: Metadata = {
  title: "Legal Documents",
};

const Page = () => {
  return (
    <div className="container mx-auto">
      <PageBreadCrumb
        currentPage="Legal Documents"
        parentPage="Administrative Records"
      />

      <Header />
      <LegalDocumentsTable />
    </div>
  );
};

export default Page;
