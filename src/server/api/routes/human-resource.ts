import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { ROLES } from "@/constants/roles";
import { GENDERS } from "@/constants/genders";
import { MARITAL_STATUSES } from "@/constants/marital-statuses";
import { createUser, createAccount } from "@/lib/api/auth/mutation";
import { createEmployee, createEmployeeTraining } from "@/lib/api/human-resource/mutation";
import {
  getAllEmployees,
  getEmployeeTrainingsByEmployeeId,
  getEmployeeTrainingsPerEmployee,
} from "@/lib/api/human-resource/query";
import { editEmployeeInfo } from "@/lib/api/human-resource/mutation";
import { generateUUID } from "@/lib/utils";

export const humanResourceRouter = createTRPCRouter({
  createEmployeeAccount: protectedProcedure
    .input(
      z.object({
        // user fields
          name: z.string(),
          email: z.string(),
          role: z.enum(ROLES),
          emailVerified: z.boolean(),
        // employee fields
          birthDate: z.string().transform((val) => new Date(val)),
          gender: z.enum(GENDERS),
          maritalStatus: z.enum(MARITAL_STATUSES),
          nationality: z.string(),
          address: z.string(),
          contactNumber: z.string(),
        // account fields
          password: z.string(),
      })
    ).mutation(async ({ input }) => {
      try {
        const newUser = await createUser({
          id: generateUUID(),
          name: input.name,
          email: input.email,
          emailVerified: input.emailVerified,
          role: input.role,
        });

        if (!newUser) {
          throw new Error("Error creating user");
        }

        const newAccount = await createAccount({
          id: generateUUID(),
          userId: newUser.id,
          accountId: newUser.email,
          providerId: "credentials",
          expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
          password: input.password,
        });

        const newEmployee = await createEmployee({
          id: generateUUID(),
          userId: newUser.id,
          birthDate: input.birthDate,
          gender: input.gender,
          maritalStatus: input.maritalStatus,
          nationality: input.nationality,
          address: input.address,
          contactNumber: input.contactNumber,
        });

        return {
          userId: newUser.id,
          accountId: newAccount?.accountId,
          employeeId: newEmployee?.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        };
      } catch (error) {
        console.log(error);
      }
  }),

  getAllEmployees: protectedProcedure
    .query(async () => {
      try {
        return await getAllEmployees();
      } catch (error) {
        console.log(error);
      }
  }),
  editEmployeeInfo: protectedProcedure
    .input(
      z.object({
        employeeId: z.string(),
        data: z.object({
          gender: z.enum(GENDERS).optional(),
          maritalStatus: z.enum(MARITAL_STATUSES).optional(),
          birthDate: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
          nationality: z.string().optional(),
          address: z.string().optional(),
          contactNumber: z.string().optional(),
        })
      })
    ).mutation(async ({ input }) => {
      try {
        return await editEmployeeInfo(input.employeeId, input.data);
      } catch (error) {
        console.log(error);
      }
    }
  ),
  createEmployeeTraining: protectedProcedure
    .input(
      z.object({
        employeeId: z.string(),
        trainingName: z.string(),
        dateCompleted: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
      })
    ).mutation(async ({ input }) => {
      try {
        return await createEmployeeTraining({
          id: generateUUID(),
          employeeId: input.employeeId,
          trainingName: input.trainingName,
          dateCompleted: input.dateCompleted,
        });
      } catch (error) {
        console.log(error);
      }
    }
  ),
  getEmployeeTrainingsByEmployeeId: protectedProcedure
    .input(
      z.object({
        employeeId: z.string(),
      })
    ).mutation(async ({ input }) => {
      try {
        return await getEmployeeTrainingsByEmployeeId(input.employeeId);
      } catch (error) {
        console.log(error);
      }
    }
  ),
  getEmployeeTrainingsPerEmployee: protectedProcedure.query(async () => {
    try {
      return await getEmployeeTrainingsPerEmployee();
    } catch (error) {
      console.log(error);
    }
  }),
  getAllEmployeeTrainings: protectedProcedure.query(async () => {
    try {
      return await getAllEmployeeTrainings();
    } catch (error) {
      console.log(error);
    }
  })
})
