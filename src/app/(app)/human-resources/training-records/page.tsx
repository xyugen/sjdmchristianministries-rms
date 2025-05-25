import BreadcrumbLayout from "@/components/breadcrumb/page-breadcrumb";
import { type Metadata } from "next";
import EmployeeTrainingTable from "./_components/data-table";
import Header from "./_components/table-header";

export const metadata: Metadata = {
  title: "Training Records",
};

const Page = () => {
  return (
    <div className="container mx-auto">
      <BreadcrumbLayout
        currentPage="Training Records"
        parentPage="Human Resources Records"
      />
      <Header />
      <EmployeeTrainingTable />
    </div>
  );
};

export default Page;
