import { DOCUMENT_ORIGIN, DOCUMENT_TYPE } from "@/constants/document";
import { z } from "zod";

export const createDocumentSchema = z.object({
  issuerId: z.string().min(1, { message: "Required" }),
  documentType: z.enum(DOCUMENT_TYPE),
  documentNumber: z.string().min(1, { message: "Required" }),
  documentOrigin: z.enum(DOCUMENT_ORIGIN),
  issueDate: z.date(),
  expiryDate: z.date().optional(),
});
