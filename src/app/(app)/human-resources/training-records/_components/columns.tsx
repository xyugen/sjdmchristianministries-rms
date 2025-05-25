"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { type employeeTraining as employeeTrainingTable } from "@/server/db/schema";
import { type ColumnDef } from "@tanstack/react-table";
import { type InferSelectModel } from "drizzle-orm";
import { DataTableRowActions } from "./table-row-actions";

type EmployeeTraining = InferSelectModel<typeof employeeTrainingTable> & {
  name: string;
};

export const columns: ColumnDef<EmployeeTraining>[] = [
  {
    accessorKey: "id",
    enableHiding: true,
  },
  {
    accessorKey: "employeeId",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "trainingName",
    header: "Training",
  },
  {
    accessorKey: "dateCompleted",
    header: "Date Completed",
    cell: ({ getValue }) => {
      const rawDate = new Date(getValue() as string);
      const formattedDate = rawDate.toLocaleDateString("en-US");
      return formattedDate;
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
  },
];
