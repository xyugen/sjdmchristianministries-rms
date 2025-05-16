import { createFinancialTransaction } from "@/lib/api/finance/mutation";
import { getAllFinancialTransactions, getWeeklyFinance } from "@/lib/api/finance/query";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { generateUUID } from "@/lib/utils";
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
  getWeeklyFinance: protectedProcedure.query(async () => {
    try {
      const res = getWeeklyFinance();
      return res;
    } catch (error) {
      console.log(error);
    }
  }),
});