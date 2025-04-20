import { 
  user as userTable,
  account as accountTable, 
} from "@/server/db/schema";
import { db, eq } from "@/server/db";

export const getUserByEmail = async (email: string) => {
  try {
    const result = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email))
      .limit(1);
    return result[0] ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAccountByUserId = async (userId: string) => {
  try {
    const result = await db
      .select()
      .from(accountTable)
      .where(eq(accountTable.userId, userId))
      .limit(1);
    return result[0] ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
};