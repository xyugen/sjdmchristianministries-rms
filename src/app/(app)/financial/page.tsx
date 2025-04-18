
import BreadcrumbLayout from "@/components/breadcrumb/page-breadcrumb";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col">
      <BreadcrumbLayout
        currentPage="Financial Records"
      />
      
    </div>
  )
}

export default Page;
