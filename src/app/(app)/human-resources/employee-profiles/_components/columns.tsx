"use client";

import { Badge } from "@/components/ui/badge";
import type { RoleType } from "@/constants/roles";
import type { InferSelectModel } from "@/server/db";
import type { employee } from "@/server/db/schema";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./table-row-actions";

type Employees = InferSelectModel<typeof employee> & {
  name: string;
  role: RoleType | null;
  email: string;
};

export const columns: ColumnDef<Employees>[] = [
  {
    accessorKey: "id",
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
    cell: ({ getValue }) => {
      const role = getValue() as RoleType | null;
      return (
        <Badge
          variant="secondary"
          className={`inline-flex w-20 justify-center rounded-md p-1.5 text-xs font-medium ${
            role === "admin"
              ? "bg-blue-100 text-blue-700"
              : role === "pastor"
                ? "bg-green-100 text-green-700"
                : role === "treasurer"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
          } `}
        >
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: "emailVerified",
    header: "Email Verified",
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <Badge
          variant={value ? "green" : "destructive"}
          className="inline-flex w-24 justify-center p-1.5"
        >
          {value ? "Verified" : "Not Verified"}
        </Badge>
      );
    },
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
    accessorKey: "contactNumber",
    header: "Contact Number",
  },
  {
    accessorKey: "password",
  },
  {
    id: "actions",
    cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
  },
];
