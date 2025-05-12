import React from "react";
import PageBreadCrumb from "@/components/breadcrumb/page-breadcrumb";
import FormHeader from "./_components/form/form-header";

const Page = () => {
  return (
    <div className="w-full">
      <PageBreadCrumb
        subPage="Create"
        currentPage="Legal Documents"
        parentPage="Administrative Records"
      />

      <FormHeader/>
    </div>
  );
};

export default Page;
