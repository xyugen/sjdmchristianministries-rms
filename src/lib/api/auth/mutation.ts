import {
  user as userTable, 
  account as accountTable, 
  session as sessionTable, 
  verification as verificationTable 
} from "@/server/db/schema";
import {db} from "@/server/db";
import { generateUUID } from "@/lib/utils";

export const createUser = async (user) => {
  try {
    return await db.insert(userTable).values({
      id: generateUUID(),
      ...user
    })
      .returning()
      .run();
  } catch (error) {
    console.log(error);
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