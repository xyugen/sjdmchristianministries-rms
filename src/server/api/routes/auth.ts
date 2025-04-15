import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { getUserByEmail, getAccountByUserId } from "@/lib/api/auth/query";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  login: publicProcedure.input(z.object({
    email: z.string(),
    password: z.string(),
  }))
  .mutation(async ({ input }) => {
    try {
      const user = await getUserByEmail(input.email);
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Email does not match any record",
        });
      }

      const account = await getAccountByUserId(user.id);

      if (!account) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Account not found",
        })
      }

      if (account.password !== input.password) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect password",
        });
      }

      console.log({user, account})

      return {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      }
      
    } catch (error) {
      console.log(error);
    }
  }),
});