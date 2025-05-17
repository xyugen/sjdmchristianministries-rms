import { generateUUID } from "@/lib/utils";
import { db, type InferInsertModel, eq } from "@/server/db";
import {
  account as accountTable,
  session as sessionTable,
  user as userTable,
  verification as verificationTable,
} from "@/server/db/schema";

import { RoleType } from "@/constants/roles";

type User = InferInsertModel<typeof userTable>;
type Account = InferInsertModel<typeof accountTable>;
type Session = InferInsertModel<typeof sessionTable>;
type Verification = InferInsertModel<typeof verificationTable>;

type TypeEditUser = {
  name?: string;
  email?: string;
  role?: RoleType;
}

export const createUser = async (user: User) => {
  try {
    const result = await db.insert(userTable).values(user).returning().all();
    return result[0] ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const editUser = async (id: string, user: TypeEditUser) => {
  try {
    return await db
      .update(userTable)
      .set(user)
      .where(eq(userTable.id, id))
      .returning()
      .run();
  } catch (error) {
    console.log(error);
  }
}

export const createAccount = async (account: Account) => {
  try {
    const result = await db
      .insert(accountTable)
      .values(account)
      .returning()
      .all();
    return result[0] ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createSession = async (session: Session) => {
  session = {
    ...session,
    id: generateUUID(),
  };

  try {
    return await db.insert(sessionTable).values(session).returning().execute();
  } catch (error) {
    console.log(error);
  }
};

export const createVerification = async (verification: Verification) => {
  try {
    verification = {
      ...verification,
      id: generateUUID(),
    };
    return await db
      .insert(verificationTable)
      .values(verification)
      .returning()
      .execute();
  } catch (error) {
    console.log(error);
  }
};
