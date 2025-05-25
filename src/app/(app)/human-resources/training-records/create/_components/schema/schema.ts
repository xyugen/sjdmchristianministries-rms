import { z } from "zod";

export const trainingFormSchema = z.object({
  employeeId: z.string().min(1, "Employee is required"),
  trainingName: z.string().min(1, "Training name is required"),
  dateCompleted: z.date({ required_error: "Date is required" }),
});
