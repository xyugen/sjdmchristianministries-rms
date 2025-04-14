import PageBreadCrumb from "@/components/breadcrumb/page-breadcrumb";
import React from "react";
import FormHeader from "./_components/form-header";
import CreateDocumentForm from "./_components/form";

const Page = () => {
  return (
    <div>
        <PageBreadCrumb
          subPage="Create"
          currentPage="Legal Documents"
          parentPage="Administrative Records"
        />

      <FormHeader />
      <CreateDocumentForm/>  
    </div>
  );
};

export default Page;
