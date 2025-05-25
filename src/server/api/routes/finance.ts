import { createFinancialTransaction, deleteFinancialTransaction, editFinancialTransaction } from "@/lib/api/finance/mutation";
import { getAllFinancialTransactions, getCurrentFund, getWeeklyInflows } from "@/lib/api/finance/query";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { coerceDateOptional, generateUUID } from "@/lib/utils";
import { TRANSACTION_TYPE, TRANSACTION_CATEGORY } from "@/constants/transaction";
import { transactionSchema } from "@/app/(app)/financial/create/_components/schema/schema";


export const financeRouter = createTRPCRouter({
  createFinancialTransaction: protectedProcedure.input(transactionSchema).mutation(async ({ input }) => {
    try {
      return await createFinancialTransaction({id: generateUUID(), ...input});
    } catch (error) {
      console.log("failed to create transaction", error);
    }
  }),
  getAllFinancialTransactions: protectedProcedure.query(async () => {
    try {
      return await getAllFinancialTransactions();
    } catch (error) {
      console.log(error);
    }
  }),
  editFinancialTransaction: protectedProcedure
    .input(z.object({
      id: z.string(),
      data: z.object({
        recordedById: z.string().optional(),
        type: z.enum(TRANSACTION_TYPE).optional(),
        category: z.enum(TRANSACTION_CATEGORY).optional(),
        description: z.string().optional(),
        amount: z.number().optional(),
        transactionDate: coerceDateOptional(),
        details: z.string().optional(),
      })
    }))
    .mutation(async ({ input }) => {
      try {
        return await editFinancialTransaction(input.id, input.data);
      } catch (error) {
        console.log(error);
      }
    }
  ),
  deleteFinancialTransaction: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await deleteFinancialTransaction(input.id);
    }
  ),
  getCurrentFund: protectedProcedure.query(async () => {
    try {
      return await getCurrentFund();
    } catch (error) {
      console.log(error);
    }
  }),
  getWeeklyInflows: protectedProcedure.query(async () => {
    try {
      return await getWeeklyInflows();
    } catch (error) {
      console.log(error);
    }
  }),
});