import { z } from "zod";

export const trainingFormSchema = z.object({
  trainingName: z.string().min(1, "Training name is required"),
  dateCompleted: z.date({ required_error: "Date is required" }),
});
