import BreadcrumbLayout from "@/components/breadcrumb/page-breadcrumb";
import React from "react";
import Header from "./_components/table-header";
import TransactionsTable from "./_components/data-table";
import { BalanceCard } from "./_components/panel/card";

const Page = () => {
  return (
    <div className="mx-auto w-full px-4">
      <BreadcrumbLayout currentPage="Financial Records" />
      <Header />
      <BalanceCard />
      <TransactionsTable />
    </div>
  );
};

export default Page;
