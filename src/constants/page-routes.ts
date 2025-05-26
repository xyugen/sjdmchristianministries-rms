export enum PageRoutes {
  LOGIN = "/login",
  REGISTER = "/register",

  DASHBOARD = "/",

  //Administrative Records
  ADMINISTRATIVE = "/administrative",
  ORGANIZATIONAL_POLICIES = `${ADMINISTRATIVE}/organizational-policies`,

  //Meeting Agendas
  MEETING_AGENDAS = `${ADMINISTRATIVE}/meeting-agendas`,
  MEETING_AGENDAS_CREATE = `${ADMINISTRATIVE}/meeting-agendas/create`,

  //Legal documents
  LEGAL_DOCUMENTS = `${ADMINISTRATIVE}/legal-documents`,
  DOCUMENTS_CREATE = `${ADMINISTRATIVE}/legal-documents/create`,

  //Human Resource Records
  HUMAN_RESOURCE = "/human-resources",
  EMPLOYEE_PROFILES = `${HUMAN_RESOURCE}/employee-profiles`,
  EMPLOYEE_PROFILES_CREATE = `${HUMAN_RESOURCE}/employee-profiles/create`,

  TRAINING_RECORDS = `${HUMAN_RESOURCE}/training-records`,
  TRAINING_RECORDS_CREATE = `${HUMAN_RESOURCE}/training-records/create`,

  //Financial Records
  FINANCIAL= "/financial",
  FINANCIAL_CREATE = `${FINANCIAL}/create`
}
