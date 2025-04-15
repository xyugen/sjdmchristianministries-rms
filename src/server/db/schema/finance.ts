/*************************************
 * Tables used for financial records *
 *************************************/

import {
  TRANSACTION_CATEGORY,
  TRANSACTION_TYPE,
} from "@/constants/transaction";
import { int, real, text } from "drizzle-orm/sqlite-core";
import { createTable } from "../table";
import { employee } from "./human-resource";

export const financialTransactions = createTable("financial_transactions", {
  id: text("id").primaryKey(),
  recordedById: text("recorded_by_id")
    .notNull()
    .references(() => employee.id, { onDelete: "no action" }),
  type: text("type", { enum: TRANSACTION_TYPE }).notNull(),
  category: text("category", { enum: TRANSACTION_CATEGORY }).notNull(),
  description: text("description", { mode: "text" }),
  amount: real("amount").default(0),
  transactionDate: int("transaction_date", { mode: "timestamp" }),
  details: text("details", { mode: "text" }),
});
