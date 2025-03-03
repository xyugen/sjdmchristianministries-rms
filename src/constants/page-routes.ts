export enum PageRoutes {
  LOGIN = "/login",

  DASHBOARD = "/dashboard", 

  //Administrative Records
  ADMINISTRATIVE = "/administrative",
  ORGANIZATIONAL_POLICIES = `${ADMINISTRATIVE}/organizational-policies`,
  MEETING_AGENDAS = `${ADMINISTRATIVE}/meeting-agendas`,
  LEGAL_DOCUMENTS = `${ADMINISTRATIVE}/legal-documents`,

  //Human Resource Records
  HUMAN_RESOURCE = "/human-resource",
  EMPLOYEE_PROFILES = `${HUMAN_RESOURCE}/employee-profiles`,
  TRAINING_RECORDS = `${HUMAN_RESOURCE}/training-records`,

  //Financial Records
  FINANCIAL_RECORDS = "/financial-records",
  FINANCIAL_REPORTS = `${FINANCIAL_RECORDS}/financial-reports`,
  EXPENSE_INVOICES = `${FINANCIAL_RECORDS}/expense-invoices`,
  PURCHASE_ORDERS_RECEIPTS = `${FINANCIAL_RECORDS}/purchase-orders-receipts`,
}