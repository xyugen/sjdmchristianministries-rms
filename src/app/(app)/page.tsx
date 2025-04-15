import BreadcrumbLayout from "@/components/breadcrumb/page-breadcrumb";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Page = () => {
  return (
    <div className="flex flex-col">
      <BreadcrumbLayout currentPage="Dashboard" />
    </div>
  );
};

export default Page;
