import { asc, db, eq } from "@/server/db";
import {
  employee as employeeTable,
  employeeTraining as employeeTrainingTable,
  user as userTable
} from "@/server/db/schema";

export const getAllEmployees = async () => {
  try {
    return await db
    .select({
      id: employeeTable.id,
      userId: employeeTable.userId,
      name: userTable.name,
      email: userTable.email,
      role: userTable.role,
      birthDate: employeeTable.birthDate,
      gender: employeeTable.gender,
      maritalStatus: employeeTable.maritalStatus,
      nationality: employeeTable.nationality,
      address: employeeTable.address,
      contactNumber: employeeTable.contactNumber,
    })
    .from(employeeTable)
    .innerJoin(userTable, eq(employeeTable.userId, userTable.id))
    .orderBy(asc(userTable.name));
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

export const getEmployeeTrainingsByEmployeeId = async (employeeId: string) => {
  try {
    const result = await db
      .select({
        employeeId: employeeTable.id,
        employeeName: userTable.name,
        email: userTable.email,
        role: userTable.role,
        trainingId: employeeTrainingTable.id,
        trainingName: employeeTrainingTable.trainingName,
        dateCompleted: employeeTrainingTable.dateCompleted,
      })
      .from(employeeTrainingTable)
      .innerJoin(employeeTable, eq(employeeTable.id, employeeTrainingTable.employeeId))
      .innerJoin(userTable, eq(employeeTable.userId, userTable.id))
      .where(eq(employeeTrainingTable.employeeId, employeeId))
      .orderBy(asc(employeeTrainingTable.dateCompleted));

      if(result.length === 0) {
        return {};
      }

      const first = result[0]!;

      return {
        employeeId: first.employeeId,
        employeeName: first.employeeName,
        email: first.email,
        role: first.role ?? "Pastor",
        trainings: result.map((training) => ({
          trainingId: training.trainingId ?? null,
          trainingName: training.trainingName ?? null,
          dateCompleted: training.dateCompleted ?? null,
        })),
      };
  } catch (error) {
    console.log(error);
  }
}

export const getEmployeeTrainingsPerEmployee = async () => {
  try {
    const result = await db.select({
      employeeId: employeeTable.id,
      name: userTable.name,
      email: userTable.email,
      role: userTable.role,
      trainingId: employeeTrainingTable.id,
      trainingName: employeeTrainingTable.trainingName,
      dateCompleted: employeeTrainingTable.dateCompleted,
    })
    .from(employeeTable)
    .innerJoin(userTable, eq(employeeTable.userId, userTable.id))
    .innerJoin(employeeTrainingTable, eq(employeeTable.id, employeeTrainingTable.employeeId))
    .orderBy(asc(userTable.name), asc(employeeTrainingTable.dateCompleted));

    const groupedResult = result.reduce((acc, curr) => {
      const employeeId = curr.employeeId;
      if (!acc[employeeId]) {
        acc[employeeId] = {
          employeeId: curr.employeeId,
          name: curr.name,
          email: curr.email,
          role: curr.role ?? "Pastor",
          trainings: [],
        };
      }
      
      if (curr.trainingId) {
        acc[employeeId].trainings.push({
          trainingId: curr.trainingId,
          trainingName: curr.trainingName,
          dateCompleted: curr.dateCompleted ?? null,
        });
      }

      return acc;
    }, {} as Record<string, {
      employeeId: string;
      name: string;
      email: string;
      role: string;
      trainings: {
        trainingId: string;
        trainingName: string;
        dateCompleted: Date | null;
      }[];
    }>);

    return Object.values(groupedResult);

  } catch (error) {
    console.log(error);
  }
}

export const getAllEmployeeTrainings = async () => {
  try {
    return await db
    .select({
      employeeId: employeeTable.id,
      name: userTable.name,
      email: userTable.email,
      role: userTable.role,
      trainingId: employeeTrainingTable.id,
      trainingName: employeeTrainingTable.trainingName,
      dateCompleted: employeeTrainingTable.dateCompleted,
    })
    .from(employeeTable)
    .innerJoin(userTable, eq(employeeTable.userId, userTable.id))
    .innerJoin(employeeTrainingTable, eq(employeeTable.id, employeeTrainingTable.employeeId))
    .orderBy(asc(userTable.name), asc(employeeTrainingTable.dateCompleted));
  } catch (error) {
    console.log(error);
  }
}