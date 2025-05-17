import { GENDERS } from "@/constants/genders";
import { MARITAL_STATUSES } from "@/constants/marital-statuses";
import { ROLES } from "@/constants/roles";
import { z } from "zod";

export const employeeFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(ROLES, {
    required_error: "Please select a role",
  }),
  emailVerified: z.boolean().default(false),
  birthDate: z.date({
    required_error: "Birth date is required",
  }),
  gender: z.enum(GENDERS, {
    required_error: "Please select a gender",
  }),
  maritalStatus: z.enum(MARITAL_STATUSES, {
    required_error: "Please select a marital status",
  }),
  nationality: z.string().min(1, "Nationality is required"),
  address: z.string().min(1, "Address is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})