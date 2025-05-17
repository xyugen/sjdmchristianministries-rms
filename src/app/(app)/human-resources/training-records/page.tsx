import { type Metadata } from "next";
import * as React from "react";
import BreadcrumbLayout from "@/components/breadcrumb/page-breadcrumb";
import Header from "./_components/table-header";
import  EmployeeTrainingRecord from "./_components/data-table";

export const metadata: Metadata = {
  title: "Training Records",
};

const Page = () => {
  return (
    <div className="container mx-auto">
      <BreadcrumbLayout
        currentPage="Training Records"
        parentPage="Human Resources Records"
      />
      <Header />
    </div>
  );
};

export default Page;

