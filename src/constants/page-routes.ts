export enum PageRoutes {
  LOGIN = "/login",

  DASHBOARD = "/", 

  //Administrative Records
  ADMINISTRATIVE = "/administrative",
  ORGANIZATIONAL_POLICIES = `${ADMINISTRATIVE}/organizational-policies`,
  MEETING_AGENDAS = `${ADMINISTRATIVE}/meeting-agendas`,
  LEGAL_DOCUMENTS = `${ADMINISTRATIVE}/legal-documents`,

  //Human Resource Records
  HUMAN_RESOURCE = "/human-resources",
  EMPLOYEE_PROFILES = `${HUMAN_RESOURCE}/employee-profiles`,
  TRAINING_RECORDS = `${HUMAN_RESOURCE}/training-records`,

  //Financial Records
  FINANCIAL= "/financial",
  FINANCIAL_REPORTS = `${FINANCIAL}/financial-reports`,
  EXPENSE_INVOICES = `${FINANCIAL}/expense-invoices`,
  PURCHASE_ORDERS_RECEIPTS = `${FINANCIAL}/purchase-orders-receipts`,
}