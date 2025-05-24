import { GENDERS } from "@/constants/genders";
import { MARITAL_STATUSES } from "@/constants/marital-statuses";
import { ROLES } from "@/constants/roles";
import {
  createAccount,
  createUser,
  deleteUser,
  editUser,
} from "@/lib/api/auth/mutation";
import {
  createEmployee,
  createEmployeeTraining,
  deleteEmployeeTraining,
  editEmployeeInfo,
  editEmployeeTraining,
} from "@/lib/api/human-resource/mutation";
import {
  getAllEmployees,
  getAllEmployeeTrainings,
  getEmployeeByEmployeeId,
  getEmployeeTrainingsByEmployeeId,
  getEmployeeTrainingsPerEmployee,
} from "@/lib/api/human-resource/query";
import { coerceDateRequired, coerceDateOptional, generateUUID } from "@/lib/utils";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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
        birthDate: coerceDateOptional(),
        gender: z.enum(GENDERS),
        maritalStatus: z.enum(MARITAL_STATUSES),
        nationality: z.string(),
        address: z.string(),
        contactNumber: z.string(),
        // account fields
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
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
  getAllEmployees: protectedProcedure.query(async () => {
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
          // user fields
          name: z.string().optional(),
          email: z.string().optional(),
          role: z.enum(ROLES).optional(),
          // employee fields
          gender: z.enum(GENDERS).optional(),
          maritalStatus: z.enum(MARITAL_STATUSES).optional(),
          birthDate: coerceDateOptional(),
          nationality: z.string().optional(),
          address: z.string().optional(),
          contactNumber: z.string().optional(),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const { name, email, role, ...employeeData } = input.data;
        const userData = { name, email, role };

        const employee = await getEmployeeByEmployeeId(input.employeeId);

        if (!employee) {
          throw new Error("Employee not found");
        }

        const editedEmployee = await editEmployeeInfo(
          input.employeeId,
          employeeData,
        );
        const editedUser = await editUser(employee.userId, userData);

        return { editedEmployee, editedUser };
      } catch (error) {
        console.log(error);
      }
    }),
  deleteEmployee: protectedProcedure
    .input(
      z.object({
        employeeId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const employee = await getEmployeeByEmployeeId(input.employeeId);

        if (!employee) {
          throw new Error("Employee not found");
        }

        return await deleteUser(employee.userId);
      } catch (error) {
        console.log(error);
      }
    }),
  createEmployeeTraining: protectedProcedure
    .input(
      z.object({
        employeeId: z.string(),
        trainingName: z.string(),
        dateCompleted: coerceDateOptional(),
      }),
    )
    .mutation(async ({ input }) => {
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
    }),
  getEmployeeTrainingsByEmployeeId: protectedProcedure
    .input(
      z.object({
        employeeId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        return await getEmployeeTrainingsByEmployeeId(input.employeeId);
      } catch (error) {
        console.log(error);
      }
    }),
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
  }),
  editEmployeeTraining: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          trainingName: z.string().optional(),
          dateCompleted: coerceDateOptional(),
        })
      })
    )
    .mutation(async ({ input }) => {
      try {
        // FIXME: @darvey-trinidad input .id and .data is not defined
        return await editEmployeeTraining(input.id, input.data);
      } catch (error) {
        console.log(error);
      }
    }),
  deleteEmployeeTraining: protectedProcedure
    .input(
      z.object({
        employeeTrainingId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        return await deleteEmployeeTraining(input.employeeTrainingId);
      } catch (error) {
        console.log(error);
      }
    }),
});
