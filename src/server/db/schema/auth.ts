import { sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";
import { createTable } from "../table";
import { ROLES } from "@/constants/roles";

// User Table
export const user = createTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "boolean" }),
  role: text("role", { enum: ROLES }),
  banned: integer("banned", { mode: "boolean" }),
  banReason: text("banReason"),
  banExpires: integer("banExpires", { mode: "timestamp" }),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .$onUpdateFn(() => new Date())
    .$type<Date>(),
});

// Session Table
export const session = createTable("session", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  ipAddress: text("ipAddress"),
  impersonatedBy: text("impersonatedBy"),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .$onUpdateFn(() => new Date())
    .$type<Date>(),
});

// Account Table
export const account = createTable("account", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  password: text("password"),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .$onUpdateFn(() => new Date())
    .$type<Date>(),
});

// Verification Table
export const verification = createTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .$onUpdateFn(() => new Date())
    .$type<Date>(),
});
