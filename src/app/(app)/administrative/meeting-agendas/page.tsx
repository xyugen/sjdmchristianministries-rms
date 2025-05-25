import React from "react";
import BreadcrumbLayout from "@/components/breadcrumb/page-breadcrumb";
import MeetingAgendasTable from "./_components/data-table";
import Header from "./_components/table-header";

export const metadata = {
  title: "Meeting Agendas",
};

const Page = () => {
  return (
    <div className="mx-auto w-full px-4">
      <BreadcrumbLayout
        currentPage="Meeting Agendas"
        parentPage="Administrative Records"
      />

      <Header />
      <MeetingAgendasTable />
    </div>
  );
};

export default Page;
