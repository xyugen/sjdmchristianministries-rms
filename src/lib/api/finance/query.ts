import { 
  financialTransactions as financialTransactionsTable,
  employee as employeeTable,
  user as userTable
} from "@/server/db/schema";
import { db, desc, eq } from "@/server/db";

export const getAllFinancialTransactions = async () => {
  try {
    return await 
      db.select({
        id: financialTransactionsTable.id,
        recordedById: financialTransactionsTable.recordedById,
        employeeName: userTable.name,
        transactionDate: financialTransactionsTable.transactionDate,
        type: financialTransactionsTable.type,
        category: financialTransactionsTable.category,
        description: financialTransactionsTable.description,
        amount: financialTransactionsTable.amount,
        details: financialTransactionsTable.details,
      })
      .from(financialTransactionsTable)
      .leftJoin(employeeTable, eq(employeeTable.id, financialTransactionsTable.recordedById))
      .leftJoin(userTable, eq(userTable.id, employeeTable.userId))
      .orderBy(desc(financialTransactionsTable.transactionDate));
  } catch (error) {
    console.log(error);
  }
}