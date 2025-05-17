import { type Metadata } from "next";
import * as React from "react";
import BreadcrumbLayout from "@/components/breadcrumb/page-breadcrumb";

export const metadata: Metadata = {
  title: "Training Records",
};

function Page() {
  return (
    <div className="flex flex-col">
        <BreadcrumbLayout
          currentPage="Training Records"
          parentPage="Human Resources Records"
        />
    </div>
  );
}

export default Page;
