import { employee as employeeTable, employeeTraining as employeeTrainingTable } from "@/server/db/schema";
import { db } from "@/server/db";
import { generateUUID } from "@/lib/utils";

export const createEmployee = async (employee) => {
  try {
    return await db.insert(employeeTable).values({
      id: generateUUID(),
      ...employee
    })
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
}

export const createEmployeeTraining = async (employeeTraining) => {
  try {
    return await db.insert(employeeTrainingTable).values({
      id: generateUUID(),
      ...employeeTraining
    })
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
}