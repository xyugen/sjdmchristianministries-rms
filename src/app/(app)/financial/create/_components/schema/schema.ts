import { z } from "zod";

import {
  TRANSACTION_CATEGORY,
  TRANSACTION_TYPE,
} from "@/constants/transaction";

export const transactionSchema = z.object({
  recordedById: z.string({
    required_error: "Please select who recorded this transaction",
  }),
  type: z.enum(TRANSACTION_TYPE, {
    required_error: "Please select a transaction type",
  }),
  category: z.enum(TRANSACTION_CATEGORY, {
    required_error: "Please select a category",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters",
  }),
  amount: z.coerce.number().positive({
    message: "Amount must be a positive number",
  }),
  transactionDate: z.date({
    required_error: "Please select a date",
  }),
  details: z.string().optional(),
});
