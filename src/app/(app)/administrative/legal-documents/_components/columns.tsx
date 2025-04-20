"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  type DocumentOrigin,
  documentOriginLabels,
  type DocumentType,
  documentTypeLabels,
} from "@/constants/document";
import { type legalDocuments as legalDocumentsTable } from "@/server/db/schema";
import { type ColumnDef } from "@tanstack/react-table";
import { type InferSelectModel } from "drizzle-orm";
export type Document = {
  issuedBy: string;
  docType: string;
  docNumber: number;
  issueDate: Date;
  expiryDate: Date;
};

type LegalDocument = InferSelectModel<typeof legalDocumentsTable> & {
  employeeName: string;
};

export const columns: ColumnDef<LegalDocument>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "documentNumber",
    header: "Document Number",
  },
  {
    accessorKey: "employeeName",
    header: "Issued By",
  },
  {
    accessorKey: "documentType",
    header: "Document Type",
    cell: ({ getValue }) => {
      return documentTypeLabels[getValue() as DocumentType];
    },
  },
  {
    accessorKey: "documentOrigin",
    header: "Document Origin",
    cell: ({ getValue }) => {
      return documentOriginLabels[getValue() as DocumentOrigin];
    },
  },
  {
    accessorKey: "issueDate",
    header: "Issue Date",
    cell: ({ getValue }) => {
      const rawDate = new Date(getValue() as string);
      const formattedDate = rawDate.toLocaleDateString("en-US");
      return formattedDate;
    },
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ getValue }) => {
      const rawDate = new Date(getValue() as string);
      const formattedDate = rawDate.toLocaleDateString("en-US");
      return formattedDate;
    },
  },
];
