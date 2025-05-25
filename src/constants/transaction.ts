export const TRANSACTION_TYPE = ["inflow", "outflow"] as const;

export const TRANSACTION_CATEGORY_INFLOW = [
  "offering",
  "pledge",
  "donation",
] as const;

export const TRANSACTION_CATEGORY_OUTFLOW = [
  "representation_expense",
  "utility_expense",
  "ministry_expense",
  "pastoral_expense"
] as const;

export const TRANSACTION_CATEGORY = [
  ...TRANSACTION_CATEGORY_INFLOW,
  ...TRANSACTION_CATEGORY_OUTFLOW
] as const;

export type TransactionType = (typeof TRANSACTION_TYPE)[number];

export type TransactionCategoryInflow = (typeof TRANSACTION_CATEGORY_INFLOW)[number];
export type TransactionCategoryOutflow = (typeof TRANSACTION_CATEGORY_OUTFLOW)[number];
export type TransactionCategory = (typeof TRANSACTION_CATEGORY)[number];

export const TransactionCategoryInflowLabels: Record<TransactionCategoryInflow, string> = {
  offering: "Offering",
  pledge: "Pledge",
  donation: "Donation",
}

export const TransactionCategoryOutflowLabels: Record<TransactionCategoryOutflow, string> = {
  representation_expense: "Representation Expense",
  utility_expense: "Utility Expense",
  ministry_expense: "Ministry Expense",
  pastoral_expense: "Pastoral Expense",
}

export const TransactionCategoryLabels: Record<TransactionCategory, string> = {
  ...TransactionCategoryInflowLabels,
  ...TransactionCategoryOutflowLabels
}

export const TransactionTypeLabels: Record<TransactionType, string> = {
  inflow: "Inflow",
  outflow: "Outflow",
};


