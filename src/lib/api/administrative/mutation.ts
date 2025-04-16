import { organizationalPolicies as orgPoliciesTable, 
  meetingAgendas as meetingAgendasTable,
  legalDocuments as legalDocumentsTable } from "@/server/db/schema";
import { db, eq, InferInsertModel } from "@/server/db";
import { generateUUID } from "@/lib/utils";

type OrganizationalPolicy = InferInsertModel<typeof orgPoliciesTable>;
type MeetingAgenda = InferInsertModel<typeof meetingAgendasTable>;
type LegalDocument = InferInsertModel<typeof legalDocumentsTable>;

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
