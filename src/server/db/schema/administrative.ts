/******************************************
 * Tables used for administrative records *
 ******************************************/

import { int, text } from "drizzle-orm/sqlite-core";
import { createTable } from "../table";
import { DOCUMENT_ORIGIN, DOCUMENT_TYPE } from "@/constants/document";
import { employee } from "./human-resource";

export const organizationalPolicies = createTable("organizational_policies", {
  id: text("id").primaryKey(),
  title: text("title", { mode: "text" }).notNull(),
  description: text("description", { mode: "text" }).notNull(),
});

export const legalDocuments = createTable("legal_documents", {
  id: text("id").primaryKey(),
  documentType: text("document_type", { enum: DOCUMENT_TYPE }).notNull(),
  documentNumber: text("document_number", { mode: "text" }),
  documentOrigin: text("document_origin", { enum: DOCUMENT_ORIGIN }).notNull(),
  issuerId: text("issuer_id", { mode: "text" })
    .notNull()
    .references(() => employee.id, { onDelete: "cascade" }),
  issueDate: int("issue_date", { mode: "timestamp" }).notNull(),
  expiryDate: int("expiry_date", { mode: "timestamp" }),
});

export const meetingAgendas = createTable("meeting_agendas", {
  id: text("id").primaryKey(),
  meetingDate: int("meeting_date", { mode: "timestamp" }).notNull(),
  startTime: int("start_time", { mode: "timestamp" }), // time
  endTime: int("end_time", { mode: "timestamp" }),
  presidingOffider: text("presiding_officer", { mode: "text" }).notNull(),
  agenda: text("agenda").notNull(),
  summary: text("summary"),
});
