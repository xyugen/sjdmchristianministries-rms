import {
  user as userTable, 
  account as accountTable, 
  session as sessionTable, 
  verification as verificationTable 
} from "@/server/db/schema";
import { db, InferSelectModel } from "@/server/db";
import { generateUUID } from "@/lib/utils";

export type newUser = InferSelectModel<typeof userTable>

export const createUser = async (user): Promise<newUser | null> => {
  try {
    const result = await db.insert(userTable).values({
      id: generateUUID(),
      ...user
    })
      .returning()
      .all();
    return result[0] ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const createAccount = async (account) => {
  try {
    return await db.insert(accountTable).values({
      id: generateUUID(),
      ...account
    })
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
}

export const createSession = async (session) => {
  try {
    return await db.insert(sessionTable).values({
      id: generateUUID(),
      ...session
    })
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
}

export const createVerification = async (verification) => {
  try {
    return await db.insert(verificationTable).values({
      id: generateUUID(),
      ...verification
    })
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
}