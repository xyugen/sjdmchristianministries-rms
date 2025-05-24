import React from "react";
import BreadcrumbLayout from "@/components/breadcrumb/page-breadcrumb";
import PoliciesForm from "./create/form/policies-form";
import PoliciesProcedure from "./_components/policies-procedure";

export const metadata = {
  title: "Organizational Policies",
};

const Page = () => {
  return (
    <div className="mx-auto w-full px-4">
      <BreadcrumbLayout
        currentPage="Policies & Procedures"
        parentPage="Administrative Records"
      />

      <div className="flex justify-end">
        <PoliciesForm />
      </div>
      <PoliciesProcedure />
    </div>
  );
};

export default Page;
