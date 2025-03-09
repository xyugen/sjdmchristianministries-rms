import { type Metadata } from "next";
import * as React from "react";
import { Separator } from "@/components/ui/separator";
import BreadcrumbLayout from "@/components/breadcrumb/page-breadcrumb";

export const metadata: Metadata = {
  title: "Financial Reports",
};

const Page = () => {
  return (
    <div className="flex flex-col">
      <div className="mt-1 flex text-center">
        <Separator orientation="vertical" className="ml-1 mr-2.5 h-5" />
        <BreadcrumbLayout
          currentPage="Financial Reports"
          parentPage="Financial Records"
        />
      </div>
    </div>
  );
};

export default Page;
