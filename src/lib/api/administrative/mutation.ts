import { type DocumentOrigin, type DocumentType } from "@/constants/document";
import { fileToBuffer, generateUUID } from "@/lib/utils";
import { CreateLegalDocument } from "@/server/api/routes/administrative";
import { db, eq, type InferInsertModel } from "@/server/db";
import {
  legalDocumentFiles as legalDocumentFilesTable,
  legalDocuments as legalDocumentsTable,
  meetingAgendas as meetingAgendasTable,
  organizationalPolicies as orgPoliciesTable,
} from "@/server/db/schema";

type OrganizationalPolicy = InferInsertModel<typeof orgPoliciesTable>;
type MeetingAgenda = InferInsertModel<typeof meetingAgendasTable>;
type LegalDocument = InferInsertModel<typeof legalDocumentsTable>;

type EditMeetingAgenda = {
  meetingDate?: Date;
  startTime?: Date;
  endTime?: Date;
  presidingOfficer?: string;
  agenda?: string;
  summary?: string;
};

type EditLegalDocument = {
  documentType?: DocumentType;
  documentOrigin?: DocumentOrigin;
  issueDate?: Date;
  documentNumber?: string;
  issuerId?: string;
  expiryDate?: Date | null;
  documentFileId?: string;
};

export const createOrganizationalPolicy = async (
  organizationalPolicy: OrganizationalPolicy,
) => {
  try {
    return await db
      .insert(orgPoliciesTable)
      .values(organizationalPolicy)
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
};

export const editOrganizationalPolicy = async (
  id: string,
  organizationalPolicy: { title?: string; description?: string },
) => {
  try {
    return await db
      .update(orgPoliciesTable)
      .set(organizationalPolicy)
      .where(eq(orgPoliciesTable.id, id))
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrganizationalPolicy = async (id: string) => {
  try {
    return await db
      .delete(orgPoliciesTable)
      .where(eq(orgPoliciesTable.id, id))
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
};

export const createMeetingAgenda = async (meetingAgenda: MeetingAgenda) => {
  try {
    return await db
      .insert(meetingAgendasTable)
      .values(meetingAgenda)
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
};

export const editMeetingAgenda = async (
  id: string,
  meetingAgenda: EditMeetingAgenda,
) => {
  try {
    return await db
      .update(meetingAgendasTable)
      .set(meetingAgenda)
      .where(eq(meetingAgendasTable.id, id))
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
};

export const deleteMeetingAgenda = async (id: string) => {
  try {
    return await db
      .delete(meetingAgendasTable)
      .where(eq(meetingAgendasTable.id, id))
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
};

export const createLegalDocument = async (legalDocument: LegalDocument) => {
  try {
    const res = await db
      .insert(legalDocumentsTable)
      .values(legalDocument)
      .returning()
      .run();
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editLegalDocument = async (
  id: string,
  legalDocument: Partial<CreateLegalDocument>,
) => {
  try {
    return await db
      .update(legalDocumentsTable)
      .set({
        id: id,
        documentType: legalDocument.documentType,
        documentOrigin: legalDocument.documentOrigin,
        issueDate: legalDocument.issueDate,
        documentNumber: legalDocument.documentNumber,
        issuerId: legalDocument.issuerId,
        expiryDate: legalDocument.expiryDate,
      })
      .where(eq(legalDocumentsTable.id, id))
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
};

export const deleteLegalDocument = async (id: string) => {
  try {
    return await db
      .delete(legalDocumentsTable)
      .where(eq(legalDocumentsTable.id, id))
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
};

export const uploadLegalDocument = async (file: File) => {
  try {
    const fileBuffer = await fileToBuffer(file);

    const [res] = await db
      .insert(legalDocumentFilesTable)
      .values({
        id: generateUUID(),
        fileName: file.name,
        file: fileBuffer,
      })
      .returning()
      .execute();

    return res?.id;
  } catch (error) {
    console.log(error);
  }
};
