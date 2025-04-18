import { 
  financialTransactions as financialTransactionsTable,
  employee as employeeTable,
  user as userTable
} from "@/server/db/schema";
import { db, desc, eq, and, between, sum, count } from "@/server/db";

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

    return {
      outflows: result.filter((transaction) => transaction.type === "outflow"),
      inflows: result.filter((transaction) => transaction.type === "inflow"),
    }
  } catch (error) {
    console.log(error);
  }
}

export const getWeeklyFinance = async () => {
  try {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // Get Monday of this week
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - ((day + 6) % 7)); // Monday of this week
    startOfThisWeek.setHours(0, 0, 0, 0);

    // Get Monday of last week
    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

    // Get end of last week (Sunday 23:59:59)
    const endOfLastWeek = new Date(startOfThisWeek);
    endOfLastWeek.setMilliseconds(-1); // One millisecond before this week's Monday

    const thisWeek = await db
      .select({
        category: financialTransactionsTable.category,
        total: sum(financialTransactionsTable.amount),
        count: count(financialTransactionsTable.id),
      })
      .from(financialTransactionsTable)
      .where(between(financialTransactionsTable.transactionDate, startOfThisWeek, now))
      .groupBy(financialTransactionsTable.category);
      
    const lastWeek = await db
      .select({
        category: financialTransactionsTable.category,
        total: sum(financialTransactionsTable.amount),
        count: count(financialTransactionsTable.id),
      })
      .from(financialTransactionsTable)
      .where(between(financialTransactionsTable.transactionDate, startOfLastWeek, endOfLastWeek))
      .groupBy(financialTransactionsTable.category);

      const summary = {
        offering: {
          thisWeekTotal: Number(thisWeek.find((t) => t.category === "offering")?.total ?? 0),
          lastWeekTotal: Number(lastWeek.find((t) => t.category === "offering")?.total ?? 0),
          thisWeekCount: thisWeek.find((t) => t.category === "offering")?.count ?? 0,
          lastWeekCount: lastWeek.find((t) => t.category === "offering")?.count ?? 0,
          totalPercentChange: ((Number(thisWeek.find((t) => t.category === "offering")?.total ?? 0) -
                                Number(lastWeek.find((t) => t.category === "offering")?.total ?? 0)) /
                                Math.max(Number(lastWeek.find((t) => t.category === "offering")?.total ?? 0), 1)) * 100,
        },
        pledge: {
          thisWeekTotal: Number(thisWeek.find((t) => t.category === "pledge")?.total ?? 0),
          lastWeekTotal: Number(lastWeek.find((t) => t.category === "pledge")?.total ?? 0),
          thisWeekCount: thisWeek.find((t) => t.category === "pledge")?.count ?? 0,
          lastWeekCount: lastWeek.find((t) => t.category === "pledge")?.count ?? 0,
          totalPercentChange: ((Number(thisWeek.find((t) => t.category === "pledge")?.total ?? 0) -
                                Number(lastWeek.find((t) => t.category === "pledge")?.total ?? 0)) /
                                Math.max(Number(lastWeek.find((t) => t.category === "pledge")?.total ?? 0), 1)) * 100,
        },
        donation: {
          thisWeekTotal: Number(thisWeek.find((t) => t.category === "donation")?.total ?? 0),
          lastWeekTotal: Number(lastWeek.find((t) => t.category === "donation")?.total ?? 0),
          thisWeekCount: thisWeek.find((t) => t.category === "donation")?.count ?? 0,
          lastWeekCount: lastWeek.find((t) => t.category === "donation")?.count ?? 0,
          totalPercentChange: ((Number(thisWeek.find((t) => t.category === "donation")?.total ?? 0) -
                                Number(lastWeek.find((t) => t.category === "donation")?.total ?? 0)) /
                                Math.max(Number(lastWeek.find((t) => t.category === "donation")?.total ?? 0), 1)) * 100,
        },
        representation_expense: {
          thisWeekTotal: Number(thisWeek.find((t) => t.category === "representation_expense")?.total ?? 0),
          lastWeekTotal: Number(lastWeek.find((t) => t.category === "representation_expense")?.total ?? 0),
          thisWeekCount: thisWeek.find((t) => t.category === "representation_expense")?.count ?? 0,
          lastWeekCount: lastWeek.find((t) => t.category === "representation_expense")?.count ?? 0,
          totalPercentChange: ((Number(thisWeek.find((t) => t.category === "representation_expense")?.total ?? 0) -
                                Number(lastWeek.find((t) => t.category === "representation_expense")?.total ?? 0)) /
                                Math.max(Number(lastWeek.find((t) => t.category === "representation_expense")?.total ?? 0), 1)) * 100,
        },
        utility_expense: {
          thisWeekTotal: Number(thisWeek.find((t) => t.category === "utility_expense")?.total ?? 0),
          lastWeekTotal: Number(lastWeek.find((t) => t.category === "utility_expense")?.total ?? 0),
          thisWeekCount: thisWeek.find((t) => t.category === "utility_expense")?.count ?? 0,
          lastWeekCount: lastWeek.find((t) => t.category === "utility_expense")?.count ?? 0,
          totalPercentChange: ((Number(thisWeek.find((t) => t.category === "utility_expense")?.total ?? 0) -
                                Number(lastWeek.find((t) => t.category === "utility_expense")?.total ?? 0)) /
                                Math.max(Number(lastWeek.find((t) => t.category === "utility_expense")?.total ?? 0), 1)) * 100,
        },
        ministry_expense: {
          thisWeekTotal: Number(thisWeek.find((t) => t.category === "ministry_expense")?.total ?? 0),
          lastWeekTotal: Number(lastWeek.find((t) => t.category === "ministry_expense")?.total ?? 0),
          thisWeekCount: thisWeek.find((t) => t.category === "ministry_expense")?.count ?? 0,
          lastWeekCount: lastWeek.find((t) => t.category === "ministry_expense")?.count ?? 0,
          totalPercentChange: ((Number(thisWeek.find((t) => t.category === "ministry_expense")?.total ?? 0) -
                                Number(lastWeek.find((t) => t.category === "ministry_expense")?.total ?? 0)) /
                                Math.max(Number(lastWeek.find((t) => t.category === "ministry_expense")?.total ?? 0), 1)) * 100,
        },
      }

    return summary;
  } catch (error) {
    console.log(error);
  }
}