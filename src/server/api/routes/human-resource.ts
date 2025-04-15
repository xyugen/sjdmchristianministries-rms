import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { ROLES } from "@/constants/roles";
import { GENDERS } from "@/constants/genders";
import { MARITAL_STATUSES } from "@/constants/marital-statuses";

import { createEmployee } from "@/lib/api/human-resource/mutation";
import { createUser, createAccount } from "@/lib/api/auth/mutation";
import { generateUUID } from "@/lib/utils";

export const humanResourceRouter = createTRPCRouter({
  createEmployeeAccount: protectedProcedure.input(
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
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      };
    } catch (error) {
      console.log(error);
    }
  }),
})