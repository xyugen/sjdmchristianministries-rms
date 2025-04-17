import { organizationalPolicies as orgPoliciesTable,
  meetingAgendas as meetingAgendasTable,
  legalDocuments as legalDocumentsTable } from "@/server/db/schema";
import { db, desc } from "@/server/db";

export const getAllOrganizationalPolicies = async () => {
  try {
    return await db.select().from(orgPoliciesTable).all();
  } catch (error) {
    console.log(error);
  }
}

export const getAllMeetingAgendas = async () => {
  try {
    return await db.select().from(meetingAgendasTable).orderBy(desc(meetingAgendasTable.meetingDate), desc(meetingAgendasTable.startTime)).all();
  } catch (error) {
    console.log(error);
  }
}

export const getAllLegalDocuments = async () => {
  try {
    return await db.select().from(legalDocumentsTable).orderBy(desc(legalDocumentsTable.issueDate)).all();
  } catch (error) {
    console.log(error);
  }
}