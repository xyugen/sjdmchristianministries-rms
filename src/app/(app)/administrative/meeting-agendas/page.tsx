import React from "react";
import BreadcrumbLayout from "@/components/breadcrumb/page-breadcrumb";

export const metadata = {
  title: "Meeting Agendas",
};

const Page = () => {
  return (
    <div className="flex flex-col">
        <BreadcrumbLayout
          currentPage="Meeting Agendas"
          parentPage="Administrative Records"
        />
    </div>
  );
};

export default Page;
