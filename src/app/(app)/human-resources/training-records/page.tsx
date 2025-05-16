import { type Metadata } from "next";
import * as React from "react";
import BreadcrumbLayout from "@/components/breadcrumb/page-breadcrumb";
import  EmployeeTrainingRecord from "./_components/data-table";

export const metadata: Metadata = {
  title: "Training Records",
};

const Page = () => {
  return (
    <div className="flex flex-col">
      <BreadcrumbLayout
        currentPage="Training Records"
        parentPage="Human Resources Records"
      />
      <EmployeeTrainingRecord />
    </div>
  );
};

export default Page;

