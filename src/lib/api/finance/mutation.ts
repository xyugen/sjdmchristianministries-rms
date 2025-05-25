import {
  type TransactionCategory,
  type TransactionType,
} from "@/constants/transaction";
import { db, eq, type InferInsertModel } from "@/server/db";
import { financialTransactions as financialTransactionsTable } from "@/server/db/schema";

type FinancialTransaction = InferInsertModel<typeof financialTransactionsTable>;

type EditFinancialTransaction = {
  recordedById?: string;
  type?: TransactionType;
  category?: TransactionCategory;
  description?: string;
  amount?: number;
  transactionDate?: Date;
  details?: string;
};

export const createFinancialTransaction = async (
  transaction: FinancialTransaction,
) => {
  try {
    return await db
      .insert(financialTransactionsTable)
      .values(transaction)
      .returning();
  } catch (error) {
    console.log(error);
  }
};

export const editFinancialTransaction = async (
  id: string,
  transaction: EditFinancialTransaction,
) => {
  try {
    return await db
      .update(financialTransactionsTable)
      .set(transaction)
      .where(eq(financialTransactionsTable.id, id))
      .returning();
  } catch (error) {
    console.log(error);
  }
};

export const deleteFinancialTransaction = async (id: string) => {
  try {
    return await db
      .delete(financialTransactionsTable)
      .where(eq(financialTransactionsTable.id, id))
      .returning();
  } catch (error) {
    console.log(error);
  }
};
