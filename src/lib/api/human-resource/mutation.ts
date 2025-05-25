import { type GenderType } from "@/constants/genders";
import { type MaritalStatusType } from "@/constants/marital-statuses";
import { db, eq, type InferInsertModel } from "@/server/db";
import {
  employee as employeeTable,
  employeeTraining as employeeTrainingTable,
} from "@/server/db/schema";

type Employee = InferInsertModel<typeof employeeTable>;
type EmployeeTraining = InferInsertModel<typeof employeeTrainingTable>;

type TypeEditEmployee = {
  gender?: GenderType;
  maritalStatus?: MaritalStatusType;
  birthDate?: Date;
  nationality?: string;
  address?: string;
  contactNumber?: string;
};

type TypeEditEmployeeTraining = {
  trainingName?: string;
  dateCompleted?: Date;
};

export const createEmployee = async (employee: Employee) => {
  try {
    const result = await db
      .insert(employeeTable)
      .values(employee)
      .returning()
      .all();

    return result[0] ?? null;
  } catch (error) {
    console.log(error);
  }
};

export const editEmployeeInfo = async (
  id: string,
  employee: TypeEditEmployee,
) => {
  try {
    return await db
      .update(employeeTable)
      .set(employee)
      .where(eq(employeeTable.id, id))
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
};

export const createEmployeeTraining = async (
  employeeTraining: EmployeeTraining,
) => {
  try {
    return await db
      .insert(employeeTrainingTable)
      .values(employeeTraining)
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
};

export const editEmployeeTraining = async (
  id: string,
  employeeTraining: TypeEditEmployeeTraining,
) => {
  try {
    return await db
      .update(employeeTrainingTable)
      .set(employeeTraining)
      .where(eq(employeeTrainingTable.id, id))
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmployeeTraining = async (id: string) => {
  try {
    return await db
      .delete(employeeTrainingTable)
      .where(eq(employeeTrainingTable.id, id))
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
};
