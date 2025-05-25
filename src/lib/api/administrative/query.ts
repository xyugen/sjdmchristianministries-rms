import { db, desc, eq } from "@/server/db";
import {
  employee as employeeTable,
  legalDocumentFiles as legalDocumentFilesTable,
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
        documentFileId: legalDocumentsTable.documentFileId,
        documentFileName: legalDocumentFilesTable.fileName,
        // documentFile: legalDocumentFiles.file,
        employeeName: usersTable.name,
      })
      .from(legalDocumentsTable)
      .leftJoin(
        employeeTable,
        eq(employeeTable.id, legalDocumentsTable.issuerId),
      )
      .leftJoin(usersTable, eq(usersTable.id, employeeTable.userId))
      .leftJoin(
        legalDocumentFilesTable,
        eq(legalDocumentFilesTable.id, legalDocumentsTable.documentFileId),
      )
      .orderBy(desc(legalDocumentsTable.issueDate))
      .all();
  } catch (error) {
    console.log(error);
  }
};

export const getLegalDocumentFileById = async (id: string) => {
  try {
    const [res] = await db
      .select({
        id: legalDocumentFilesTable.id,
        fileName: legalDocumentFilesTable.fileName,
        file: legalDocumentFilesTable.file,
      })
      .from(legalDocumentFilesTable)
      .where(eq(legalDocumentFilesTable.id, id))
      .execute();

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const downloadLegalDocumentFileById = async (id: string) => {
  try {
    const [fileRecord] = await db
      .select({
        file: legalDocumentFilesTable.file,
      })
      .from(legalDocumentFilesTable)
      .where(eq(legalDocumentFilesTable.id, id))
      .execute();

    if (!fileRecord) {
      throw new Error(`File with ID ${id} not found.`);
    }

    return fileRecord.file;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to download the legal document file.");
  }
};
