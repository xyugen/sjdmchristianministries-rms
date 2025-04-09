import { organizationalPolicies as orgPoliciesTable,
  meetingAgendas as meetingAgendasTable } from "@/server/db/schema";
import { db } from "@/server/db";

export const getAllOrganizationalPolicies = async () => {
  try {
    return await db.select().from(orgPoliciesTable).all();
  } catch (error) {
    console.log(error);
  }
}

export const getAllMeetingAgendas = async () => {
  try {
    return await db.select().from(meetingAgendasTable).all();
  } catch (error) {
    console.log(error);
  }
}