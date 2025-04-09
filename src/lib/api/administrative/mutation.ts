import { organizationalPolicies as orgPoliciesTable, 
  meetingAgendas as meetingAgendasTable } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq } from "@/server/db";
import { generateUUID } from "@/lib/utils";


export const createOrganizationalPolicy = async (organizationalPolicy) => {
  try {
    return await db.insert(orgPoliciesTable).values({
      id: generateUUID(),
      ...organizationalPolicy
    })
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

export const createMeetingAgenda = async (meetingAgenda) => {
  try {
    return await db.insert(meetingAgendasTable).values({
      id: generateUUID(),
      ...meetingAgenda
    })
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
}
