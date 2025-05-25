import React from "react";
import PageBreadCrumb from "@/components/breadcrumb/page-breadcrumb";
import FormHeader from "./_components/form/form-header";
import { EmployeeForm } from "./_components/form/employee-form";

const Page = () => {
  return (
    <div className="w-full">
      <PageBreadCrumb
        subPage="Create"
        currentPage="Legal Documents"
        parentPage="Administrative Records"
      />

      <FormHeader />
      <EmployeeForm />
    </div>
  );
};

export default Page;
