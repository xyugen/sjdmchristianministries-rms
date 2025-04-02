/***********************************
 * Tables used for human resources *
 ***********************************/

import { GENDERS } from "@/constants/genders";
import { MARITAL_STATUSES } from "@/constants/marital-statuses";
import { int, text } from "drizzle-orm/sqlite-core";
import { createTable } from "../table";
import { user } from "./auth";

export const employee = createTable("employee", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  birthDate: int("birth_date", { mode: "timestamp" }),
  gender: text("gender", { enum: GENDERS }),
  maritalStatus: text("marital_status", { enum: MARITAL_STATUSES }),
  nationality: text("nationality", { mode: "text" }),
  address: text("address", { mode: "text" }),
  contactNumber: text("contact_number", { mode: "text" }),
});

export const employeeTraining = createTable("employee_training", {
  id: text("id").primaryKey(),
  employeeId: text("employee_id")
    .notNull()
    .references(() => employee.id, { onDelete: "cascade" }),
  trainingName: text("training_name", { mode: "text" }),
  dateCompleted: int("date_completed", { mode: "timestamp" }),
});
