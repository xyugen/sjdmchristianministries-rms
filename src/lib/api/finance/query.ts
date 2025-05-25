import { TRANSACTION_TYPE } from "@/constants/transaction";
import { between, db, desc, eq, sql, sum } from "@/server/db";
import {
  employee as employeeTable,
  financialTransactions as financialTransactionsTable,
  user as userTable,
} from "@/server/db/schema";

export const getAllFinancialTransactions = async () => {
  try {
    const result = await db
      .select({
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
      .leftJoin(
        employeeTable,
        eq(employeeTable.id, financialTransactionsTable.recordedById),
      )
      .leftJoin(userTable, eq(userTable.id, employeeTable.userId))
      .orderBy(desc(financialTransactionsTable.transactionDate));

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentFund = async () => {
  try {
    const inflows = await db
      .select({ sum: sum(financialTransactionsTable.amount) })
      .from(financialTransactionsTable)
      .where(eq(financialTransactionsTable.type, TRANSACTION_TYPE[0]));

    const outflows = await db
      .select({ sum: sum(financialTransactionsTable.amount) })
      .from(financialTransactionsTable)
      .where(eq(financialTransactionsTable.type, TRANSACTION_TYPE[1]));

    const inflowValue = Number(inflows[0]?.sum);
    const outflowValue = Number(outflows[0]?.sum);

    console.log("inflow: ", inflowValue, "\noutflow:", outflowValue);

    return { currentFund: inflowValue - outflowValue };
  } catch (error) {
    console.log(error);
  }
};

export const getWeeklyInflows = async () => {
  try {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, ..., 6 = Saturday

    // Monday of this week
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - ((day + 6) % 7));
    startOfThisWeek.setHours(0, 0, 0, 0);

    // Monday of last week
    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

    // End of last week: Sunday 23:59:59
    const endOfLastWeek = new Date(startOfThisWeek);
    endOfLastWeek.setMilliseconds(-1);

    const thisWeek = await db
      .select({
        category: financialTransactionsTable.category,
        totalAmount: sql`SUM(${financialTransactionsTable.amount})`.as(
          "totalAmount",
        ),
      })
      .from(financialTransactionsTable)
      .where(
        between(
          financialTransactionsTable.transactionDate,
          startOfThisWeek,
          now,
        ),
      )
      .groupBy(financialTransactionsTable.category);

    const lastWeek = await db
      .select({
        category: financialTransactionsTable.category,
        totalAmount: sql`SUM(${financialTransactionsTable.amount})`.as(
          "totalAmount",
        ),
      })
      .from(financialTransactionsTable)
      .where(
        between(
          financialTransactionsTable.transactionDate,
          startOfLastWeek,
          endOfLastWeek,
        ),
      )
      .groupBy(financialTransactionsTable.category);

    // Merge by category
    const map = new Map<
      string,
      { category: string; thisWeekAmount: number; lastWeekAmount: number }
    >();

    for (const entry of thisWeek) {
      map.set(entry.category, {
        category: entry.category,
        thisWeekAmount: Number(entry.totalAmount ?? 0),
        lastWeekAmount: 0,
      });
    }

    for (const entry of lastWeek) {
      const existing = map.get(entry.category);
      if (existing) {
        existing.lastWeekAmount = Number(entry.totalAmount ?? 0);
      } else {
        map.set(entry.category, {
          category: entry.category,
          thisWeekAmount: 0,
          lastWeekAmount: Number(entry.totalAmount ?? 0),
        });
      }
    }

    // Compute percentage change
    const result = Array.from(map.values()).map((item) => {
      const { category, thisWeekAmount, lastWeekAmount } = item;
      const percentChange =
        lastWeekAmount === 0
          ? thisWeekAmount === 0
            ? 0
            : 100 // avoid division by zero
          : ((thisWeekAmount - lastWeekAmount) / lastWeekAmount) * 100;

      return {
        category,
        thisWeekAmount,
        lastWeekAmount,
        percentChange: +percentChange.toFixed(2), // round to 2 decimal places
      };
    });

    return result;
  } catch (error) {
    console.error("Error in getWeeklyInflows", error);
    throw error;
  }
};
