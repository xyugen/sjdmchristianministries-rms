import { TRANSACTION_TYPE } from "@/constants/transaction";
import { db, desc, eq, sum } from "@/server/db";
import {
  employee as employeeTable,
  financialTransactions as financialTransactionsTable,
  user as userTable
} from "@/server/db/schema";

export const getAllFinancialTransactions = async () => {
  try { 
    const result = await
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

    return result;
  } catch (error) {
    console.log(error);
  }
}


export const getCurrentFund = async () => {
  try {
    const inflows = await db
      .select({sum: sum(financialTransactionsTable.amount)})
      .from(financialTransactionsTable)
      .where(eq(financialTransactionsTable.type, TRANSACTION_TYPE[0]));

    const outflows = await db
      .select({sum: sum(financialTransactionsTable.amount)})
      .from(financialTransactionsTable)
      .where(eq(financialTransactionsTable.type, TRANSACTION_TYPE[1]));

    const inflowValue = Number(inflows[0]?.sum);
    const outflowValue = Number(outflows[0]?.sum);

    console.log("inflow: ", inflowValue, "\noutflow:", outflowValue);

    return {currentFund: inflowValue - outflowValue};
  } catch (error) {
    console.log(error);
  }
}