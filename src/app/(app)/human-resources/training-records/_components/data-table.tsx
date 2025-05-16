
import React from "react";
import type { EmployeeTrainingRecord } from "./columns";
import { columns } from "./columns";
import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeletion";

async function getData(): Promise<EmployeeTrainingRecord[]> {
  return [
    {
      id: 1,
      employee_id: 1,
      training_name: "Training 1",
      date_completed: new Date("2022-11-22"),
    },
    {
      id: 2,
      employee_id: 1,
      training_name: "Training 2",
      date_completed: new Date("2022-11-25"),
    },
    {
      id: 3,
      employee_id: 2,
      training_name: "Training 3",
      date_completed: new Date("2022-11-28"),
    },
  ]
}

const EmployeeTrainingRecord = async () => {
   // remove this and apply the api
  const data = await getData();
 
  return (
    <div className="mt-6">

        <DataTable
          columns={columns}
          data={data}
          filteredTitle="id"
          filteredColumn="role"
        />

    </div>
  );
};

export default EmployeeTrainingRecord;
