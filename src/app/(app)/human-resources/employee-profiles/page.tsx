import { type Metadata } from "next";
import * as React from "react";
import { Separator } from "@/components/ui/separator";
import BreadcrumbLayout from "@/components/breadcrumb/page-breadcrumb";
import { columns, type EmployeeProfile } from "./_components/columns";
import { DataTable } from "@/components/table/data-table";

export const metadata: Metadata = {
  title: "Employee Profiles",
};

const data: EmployeeProfile[] = [
  {
    id: 1,
    role: "Admin",
    name: "John Doe",
    birthDate: new Date("1994-01-01"),
    gender: "Male",
    maritalStatus: "Single",
    nationality: "Filipino",
    address: "123 Main Street, City, Country",
    contact_number: 1234567890,
  },
  {
    id: 2,
    role: "Pastor",
    name: "Jane Smith",
    birthDate: new Date("1990-05-15"),
    gender: "Female",
    maritalStatus: "Married",
    nationality: "American",
    address: "456 Elm Street, City, Country",
    contact_number: 9876543210,
  },
]

//Sample options
const SampleDocuments = [ 
  {
    label: "Admin",
    value: "Admin",
  },
  {
    label: "Pastor",
    value: "Pastor",  
  },
];


function Page() {
  return (
    <div className="flex flex-col">
      <div className="mt-1 flex text-center">
        <Separator orientation="vertical" className="ml-1 mr-2.5 h-5" />
        <BreadcrumbLayout
          currentPage="Employee Profiles"
          parentPage="Human Resources Records"
        />
      </div>

      <div className="container mx-auto py-8">
        <DataTable 
            columns={columns} 
            data={data} 
            filteredTitle="name" 
            filteredColumn="name" 
            options={SampleDocuments}
          />
      </div>
    </div>
  );
}

export default Page;

