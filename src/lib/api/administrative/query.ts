import { organizationalPolicies } from "@/server/db/schema";
import { db } from "@/server/db";

export const getAllOrganizationalPolicies = async () => {
  try {
    return await db.select().from(organizationalPolicies).all();
  } catch (error) {
    console.log(error);
  }
}