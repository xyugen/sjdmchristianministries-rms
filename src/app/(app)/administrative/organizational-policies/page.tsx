import React from "react";
import BreadcrumbLayout from "@/components/breadcrumb/page-breadcrumb";

export const metadata = {
  title: "Organizational Policies",
};

const Page = () => {
  return (
    <div className="flex flex-col">
      <BreadcrumbLayout
        currentPage="Policies & Procedures"
        parentPage="Administrative Records"
      />
    </div>
  );
};

export default Page;
