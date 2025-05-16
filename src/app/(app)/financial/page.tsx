import BreadcrumbLayout from "@/components/breadcrumb/page-breadcrumb";
import React from "react";
import Header from "./_components/table-header";
import TransactionsTable from "./_components/data-table";

const Page = () => {
  return (
    <div className="mx-auto w-full px-4">
      <BreadcrumbLayout currentPage="Financial Records" />

      <Header />
      <TransactionsTable/>
    </div>
  );
};

export default Page;
