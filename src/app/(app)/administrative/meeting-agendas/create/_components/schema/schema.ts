import { z } from "zod";

const formSchema = z.object({
  meetingDate: z.date({
    required_error: "Meeting date is required",
  }),
  startTime: z.date().optional(),
  endTime: z.date().optional(),
  presidingOfficer: z.string().min(1, "Presiding officer is required"),
  agenda: z.string().min(1, "Agenda is required"),
  summary: z.string().optional(),
})

export { formSchema }
