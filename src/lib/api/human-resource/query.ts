import { 
  employee as employeeTable,
  employeeTraining as employeeTrainingTable 
} from "@/server/db/schema";
import { db, eq } from "@/server/db";

export const getAllEmployees = async () => {
  try {
    return await db.select().from(employeeTable).all();
  } catch (error) {
    console.log(error);
  }
}

export const getEmployeeByUserId = async (userId: string) => {
  try {
    const result = await db
      .select()
      .from(employeeTable)
      .where(eq(employeeTable.userId, userId))
      .limit(1);
    return result[0] ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
}