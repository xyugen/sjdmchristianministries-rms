"use client";

import { type employeeTraining as employeeTrainingTable } from "@/server/db/schema";
import { type ColumnDef } from "@tanstack/react-table";
import { type InferSelectModel } from "drizzle-orm";

type EmployeeTraining = InferSelectModel<typeof employeeTrainingTable> & {
  name: string;
};

export const columns: ColumnDef<EmployeeTraining>[] = [
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
];
