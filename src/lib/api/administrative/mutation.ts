import {
  organizationalPolicies as orgPoliciesTable,
  meetingAgendas as meetingAgendasTable,
  legalDocuments as legalDocumentsTable
} from "@/server/db/schema";
import { db, eq, type InferInsertModel } from "@/server/db";
import { DocumentOrigin, DocumentType } from "@/constants/document";

type OrganizationalPolicy = InferInsertModel<typeof orgPoliciesTable>;
type MeetingAgenda = InferInsertModel<typeof meetingAgendasTable>;
type LegalDocument = InferInsertModel<typeof legalDocumentsTable>;

type EditMeetingAgenda = {
  meetingDate?: Date;
  startTime?: Date;
  endTime?: Date;
  presidingOfficer?: string;
  agenda?: string;
  summary?: string
}

type EditLegalDocument = {
    documentType?: DocumentType;
    documentOrigin?: DocumentOrigin;
    issueDate?: Date;
    documentNumber?: string;
    issuerId?: string;
    expiryDate?: Date;
}

export const createOrganizationalPolicy = async (organizationalPolicy: OrganizationalPolicy) => {
  try {
    return await db.insert(orgPoliciesTable)
      .values(organizationalPolicy)
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
}

export const editOrganizationalPolicy = async (id: string, organizationalPolicy: { title?: string; description?: string }) => {
  try {
    return await db.update(orgPoliciesTable)
      .set(organizationalPolicy)
      .where(eq(orgPoliciesTable.id, id))
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
}

export const deleteOrganizationalPolicy = async (id: string) => {
  try {
    return await db.delete(orgPoliciesTable)
      .where(eq(orgPoliciesTable.id, id))
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
}

export const createMeetingAgenda = async (meetingAgenda: MeetingAgenda) => {
  try {
    return await db.insert(meetingAgendasTable)
      .values(meetingAgenda)
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
}

export const editMeetingAgenda = async (
  id: string,
  meetingAgenda: EditMeetingAgenda
) => {
  try {
    return await db.update(meetingAgendasTable)
      .set(meetingAgenda)
      .where(eq(meetingAgendasTable.id, id))
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
}

export const deleteMeetingAgenda = async (id: string) => {
  try {
    return await db.delete(meetingAgendasTable)
      .where(eq(meetingAgendasTable.id, id))
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
}

export const createLegalDocument = async (legalDocument: LegalDocument) => {
  try {
    const res = await db.insert(legalDocumentsTable)
      .values(legalDocument)
      .returning()
      .run();
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const editLegalDocument = async (id: string, legalDocument: EditLegalDocument) => {
  try {
    return await db.update(legalDocumentsTable)
      .set(legalDocument)
      .where(eq(legalDocumentsTable.id, id))
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
}

export const deleteLegalDocument = async (id: string) => {
  try {
    return await db.delete(legalDocumentsTable)
      .where(eq(legalDocumentsTable.id, id))
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
}