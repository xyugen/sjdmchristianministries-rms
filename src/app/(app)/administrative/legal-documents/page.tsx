import PageBreadCrumb from "@/components/breadcrumb/page-breadcrumb";
import { type Metadata } from "next";
import LegalDocumentsTable from "./_components/data-table";
import Header from "./_components/table-header";

export const metadata: Metadata = {
  title: "Legal Documents",
};

const Page = () => {
  return (
    <div className="mx-auto w-full px-4">
      <PageBreadCrumb
        currentPage="Legal Documents"
        parentPage="Administrative Records"
      />

      <Header />
      <LegalDocumentsTable />
    </div>
  );
};

export default Page;
