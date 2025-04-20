export enum PageRoutes {
  LOGIN = "/login",

  DASHBOARD = "/", 

  //Administrative Records
  ADMINISTRATIVE = "/administrative",
  ORGANIZATIONAL_POLICIES = `${ADMINISTRATIVE}/organizational-policies`,
  MEETING_AGENDAS = `${ADMINISTRATIVE}/meeting-agendas`,

  //Legal documents
  LEGAL_DOCUMENTS = `${ADMINISTRATIVE}/legal-documents`,
  DOCUMENTS_CREATE = `${ADMINISTRATIVE}/legal-documents/create`,

  //Human Resource Records
  HUMAN_RESOURCE = "/human-resources",
  EMPLOYEE_PROFILES = `${HUMAN_RESOURCE}/employee-profiles`,
  TRAINING_RECORDS = `${HUMAN_RESOURCE}/training-records`,

  //Financial Records
  FINANCIAL= "/financial",
  FINANCIAL_CREATE = `${FINANCIAL}/create`
}