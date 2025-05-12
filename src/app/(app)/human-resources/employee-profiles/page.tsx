import { type Metadata } from "next";
import * as React from "react";
import BreadcrumbLayout from "@/components/breadcrumb/page-breadcrumb";
import Header from "./_components/table-header";
import EmployeeTable from "./_components/data-table";

export const metadata: Metadata = {
  title: "Employee Profiles",
};

function Page() {
  return (
    <div className="container mx-auto">
      <BreadcrumbLayout
        currentPage="Employee Profiles"
        parentPage="Human Resources Records"
      />
      <Header/>
      <EmployeeTable/>
    </div>
  );
}

export default Page;
