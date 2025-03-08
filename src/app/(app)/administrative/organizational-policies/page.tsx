import React from "react";
import { Separator } from "@/components/ui/separator";
import BreadcrumbLayout from "@/components/breadcrumb/page-breadcrumb";
export const metadata = {
  title: "Organizational Policies",
};

const Page = () => {
  return (
    <div className="flex flex-col">
      <div className="mt-1 flex text-center">
        <Separator orientation="vertical" className="ml-1 mr-2.5 h-5" />
        <BreadcrumbLayout
          currentPage="Policies & Procedures"
          parentPage="Administrative Records"
        />
      </div>
    </div>
  );
};

export default Page;
