import { employee as employeeTable, employeeTraining as employeeTrainingTable } from "@/server/db/schema";
import { db, type InferInsertModel } from "@/server/db";

type Employee = InferInsertModel<typeof employeeTable>;
type EmployeeTraining = InferInsertModel<typeof employeeTrainingTable>;

export const createEmployee = async (employee: Employee) => {
  try {
    const result = await db.insert(employeeTable)
      .values(employee)
      .returning()
      .all();

      return result[0] ?? null;
  } catch (error) {
    console.log(error);
  }
}

export const createEmployeeTraining = async (employeeTraining: EmployeeTraining) => {
  try {
    return await db.insert(employeeTrainingTable)
      .values(employeeTraining)
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
}