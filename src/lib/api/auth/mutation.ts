import {
  user as userTable, 
  account as accountTable, 
  session as sessionTable, 
  verification as verificationTable 
} from "@/server/db/schema";
import { db, InferInsertModel } from "@/server/db";
import { generateUUID } from "@/lib/utils";

type User = InferInsertModel<typeof userTable>;
type Account = InferInsertModel<typeof accountTable>;
type Session = InferInsertModel<typeof sessionTable>;
type Verification = InferInsertModel<typeof verificationTable>;

export const createUser = async (user: User)=> {
  try {
    const result = await db.insert(userTable)
      .values(user)
      .returning()
      .all();
    return result[0] ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const createAccount = async (account: Account) => {
  try {
    const result = await db.insert(accountTable)
      .values(account)
      .returning()
      .all();
    return result[0] ?? null;
  } catch (error) {
    console.log(error);
    return null;
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