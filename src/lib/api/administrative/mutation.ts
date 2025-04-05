import { organizationalPolicies } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq } from "@/server/db";


export const createOrganizationalPolicy = async ( organizationalPolicy ) => {
  try {
    await db.insert(organizationalPolicies).values(organizationalPolicy).returning().run();
  } catch (error) {
    console.log(error);
  }
}

export const editOrganizationalPolicy = async (id : string, organizationalPolicy) => {
  try {
    await db.update(organizationalPolicies).set(organizationalPolicy).where(eq(organizationalPolicies.id, id)).run();
  } catch (error) {
    console.log(error);
  }
}

export const deleteOrganizationalPolicy = async (id : string) => {
  try {
    await db.delete(organizationalPolicies).where(eq(organizationalPolicies.id, id)).run();
  } catch (error) {
    console.log(error);
  }
}
