import { createFinancialTransaction } from "@/lib/api/finance/mutation";
import { getAllFinancialTransactions } from "@/lib/api/finance/query";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { generateUUID } from "@/lib/utils";
import { TRANSACTION_TYPE, TRANSACTION_CATEGORY } from "@/constants/transaction";


export const financeRouter = createTRPCRouter({
  createFinancialTransaction: protectedProcedure.input(z.object({
    recordedById: z.string(),
    type: z.enum(TRANSACTION_TYPE),
    category: z.enum(TRANSACTION_CATEGORY),
    description: z.string(),
    amount: z.number(),
    transactionDate: z.string().transform((val) => new Date(val)),
    details: z.string().optional(),
  })).mutation(async ({ input }) => {
    try {
      return await createFinancialTransaction({id: generateUUID(), ...input});
    } catch (error) {
      console.log(error);
    }
  }),
  getAllFinancialTransactions: protectedProcedure.query(async () => {
    try {
      return await getAllFinancialTransactions();
    } catch (error) {
      console.log(error);
    }
  }),

});