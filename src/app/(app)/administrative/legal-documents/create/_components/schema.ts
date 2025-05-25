import { DOCUMENT_ORIGIN, DOCUMENT_TYPE } from "@/constants/document";
import { z } from "zod";

export const createDocumentSchema = z
  .object({
    issuerId: z.string().optional(),
    documentType: z.enum(DOCUMENT_TYPE, { message: "Required" }),
    documentNumber: z.string().min(1, { message: "Required" }),
    documentOrigin: z.enum(DOCUMENT_ORIGIN),
    documentFileId: z.string().min(1, { message: "Required" }),
    issueDate: z.date(),
    expiryDate: z.date().nullish(),
  })
  .refine(
    (data) => {
      if (!data.expiryDate) return true;
      return data.expiryDate >= data.issueDate;
    },
    {
      message: "Expiry date cannot be earlier than issue date",
      path: ["expiryDate"],
    },
  );
