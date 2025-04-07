"use client";

import { type ColumnDef } from "@tanstack/react-table";

export type EmployeeTrainingRecord = {
  id: number;
  employee_id: number;
  training_name: string;
  date_completed: Date;
};

export const columns: ColumnDef<EmployeeTrainingRecord>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "employee_id",
    header: "Employee ID",
  },
  {
    accessorKey: "training_name",
    header: "Training",
  },
  {
    accessorKey: "date_completed",
    header: "Date Completed",
    cell: ({ getValue }) => {
      const rawDate = new Date(getValue() as string);
      const formattedDate = rawDate.toLocaleDateString("en-US");
      return formattedDate;
    },
  },
];
