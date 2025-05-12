"use client";

import { type ColumnDef } from "@tanstack/react-table";
import type { InferSelectModel } from "@/server/db";
import type { employee } from "@/server/db/schema";
import { DataTableRowActions } from "./table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import type { RoleType } from "@/constants/roles";

type Employees = InferSelectModel<typeof employee> & {
  name : string,
  role : RoleType | null, 
  email : string 
};

export const columns: ColumnDef<Employees>[] = [
   {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  {
    accessorKey: "userId",
    header: "ID",
  },
  {
     accessorKey: "name",
     header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
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
   accessorKey: "marital_status",
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
   {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
