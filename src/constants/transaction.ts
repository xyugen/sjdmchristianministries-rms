export const TRANSACTION_TYPE = ["inflow", "outflow"] as const;

export const TRANSACTION_CATEGORY = [
  "offering",
  "pledge",
  "donation",
  "representation_expense",
  "utility_expense",
  "ministry_expense",
  "pastoral_expense"
] as const;

export type TransactionType = (typeof TRANSACTION_TYPE)[number];
export type TransactionCategory = (typeof TRANSACTION_CATEGORY)[number];

export interface Transaction {
  recordedById: string
  type: TransactionType
  category: TransactionCategory
  description: string
  amount: number
  transactionDate: Date
  details?: string
}

export const TransactionOption = [
  {
    label: "Inflow",
    value: "inflow",
  },
  {
    label: "Outflow",
    value: "outflow",
  },
];

