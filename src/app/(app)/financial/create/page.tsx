import React from "react";
import TransactionForm from "./_components/form/transaction-form";
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
      <TransactionForm />
    </div>
  );
};

export default Page;
