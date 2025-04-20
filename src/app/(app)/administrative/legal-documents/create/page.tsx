import PageBreadCrumb from "@/components/breadcrumb/page-breadcrumb";
import React from "react";
import FormHeader from "./_components/form-header";
import CreateDocumentForm from "./_components/form";

const Page = () => {
  return (
    <div className="w-full">
      <PageBreadCrumb
        subPage="Create"
        currentPage="Legal Documents"
        parentPage="Administrative Records"
      />

      <div className="mx-auto w-full px-4 lg:max-w-6xl">
        <FormHeader />
        <CreateDocumentForm />
      </div>
    </div>
  );
};

export default Page;
