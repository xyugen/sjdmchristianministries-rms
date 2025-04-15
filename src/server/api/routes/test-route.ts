import { db } from "@/server/db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { financialTransactions } from "@/server/db/schema";

export const testRoute = createTRPCRouter({
  test: publicProcedure.query(() => {
    return "test";
  }),
  getFinancialRecords: protectedProcedure.query(async () => {
    const result = await db.select().from(financialTransactions);

    return result;
  }),
});
