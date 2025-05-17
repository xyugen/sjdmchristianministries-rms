import { employee as employeeTable, employeeTraining as employeeTrainingTable } from "@/server/db/schema";
import { db, eq, type InferInsertModel } from "@/server/db";
import { MaritalStatusType } from "@/constants/marital-statuses";
import { GenderType } from "@/constants/genders";

type Employee = InferInsertModel<typeof employeeTable>;
type EmployeeTraining = InferInsertModel<typeof employeeTrainingTable>;

type TypeEditEmployee = {
  gender?: GenderType | undefined;
  maritalStatus?: MaritalStatusType | undefined;
  birthDate?: Date | undefined;
  nationality?: string | undefined;
  address?: string | undefined;
  contactNumber?: string | undefined;
}

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

export const editEmployeeInfo = async (id: string, employee: TypeEditEmployee) => {
  try {
    return await db.update(employeeTable)
      .set(employee)
      .where(eq(employeeTable.id, id))
      .returning()
      .run();
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