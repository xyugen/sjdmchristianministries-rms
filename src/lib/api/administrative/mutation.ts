import { organizationalPolicies } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq } from "@/server/db";
import { generateUUID } from "@/lib/utils";


export const createOrganizationalPolicy = async (organizationalPolicy) => {
  try {
    return await db.insert(organizationalPolicies).values({
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
    return await db.update(organizationalPolicies)
      .set(organizationalPolicy)
      .where(eq(organizationalPolicies.id, id))
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
}

export const deleteOrganizationalPolicy = async (id: string) => {
  try {
    return await db.delete(organizationalPolicies)
      .where(eq(organizationalPolicies.id, id))
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
}
