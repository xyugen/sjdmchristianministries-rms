import { financialTransactions as financialTransactionsTable } from "@/server/db/schema";
import { db, type InferInsertModel } from "@/server/db";

type FinancialTransaction = InferInsertModel<typeof financialTransactionsTable>;

export const createFinancialTransaction = async (transaction: FinancialTransaction) => {
  try {
    return await db.insert(financialTransactionsTable)
      .values(transaction)
      .returning();
  } catch (error) { 
      console.log(error);
    }
}