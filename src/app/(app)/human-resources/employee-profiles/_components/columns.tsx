"use client";

import { type ColumnDef } from "@tanstack/react-table";

export type EmployeeProfile = {
  id: number;
  role: "Admin" | "Pastor" | "Finance";
  name: string;
  birthDate: Date;
  gender: "Male" | "Female";
  maritalStatus: "Single" | "Married";
  nationality: string;
  address: string;
  contact_number: number;
};

export const columns: ColumnDef<EmployeeProfile>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "birthDate",
    header: "Birth Date",
    cell: ({ getValue }) => {
      const rawDate = new Date(getValue() as string);
      const formattedDate = rawDate.toLocaleDateString("en-US");  
      return formattedDate;
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
   accessorKey: "maritalStatus",
   header: "Marital Status",
  },
  {
    accessorKey: "nationality",
    header: "Nationality",
  },
  {
   accessorKey: "address",
   header: "Address",
  },
  {
    accessorKey: "contact_number",
    header: "Contact Number",
  },
];
