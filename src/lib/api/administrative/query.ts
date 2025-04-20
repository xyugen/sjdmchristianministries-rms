import { db, desc, eq } from "@/server/db";
import {
  employee as employeeTable,
  legalDocuments as legalDocumentsTable,
  meetingAgendas as meetingAgendasTable,
  organizationalPolicies as orgPoliciesTable,
  user as usersTable,
} from "@/server/db/schema";

export const getAllOrganizationalPolicies = async () => {
  try {
    return await db.select().from(orgPoliciesTable).all();
  } catch (error) {
    console.log(error);
  }
};

export const getAllMeetingAgendas = async () => {
  try {
    return await db
      .select()
      .from(meetingAgendasTable)
      .orderBy(
        desc(meetingAgendasTable.meetingDate),
        desc(meetingAgendasTable.startTime),
      )
      .all();
  } catch (error) {
    console.log(error);
  }
};

export const getAllLegalDocuments = async () => {
  try {
    return await db
      .select({
        id: legalDocumentsTable.id,
        documentType: legalDocumentsTable.documentType,
        documentNumber: legalDocumentsTable.documentNumber,
        documentOrigin: legalDocumentsTable.documentOrigin,
        issuerId: legalDocumentsTable.issuerId,
        issueDate: legalDocumentsTable.issueDate,
        expiryDate: legalDocumentsTable.expiryDate,
        employeeName: usersTable.name,
      })
      .from(legalDocumentsTable)
      .innerJoin(
        employeeTable,
        eq(employeeTable.id, legalDocumentsTable.issuerId),
      )
      .innerJoin(usersTable, eq(usersTable.id, employeeTable.userId))
      .orderBy(desc(legalDocumentsTable.issueDate))
      .all();
  } catch (error) {
    console.log(error);
  }
};
