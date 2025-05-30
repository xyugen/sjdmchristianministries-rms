"use client";

import {
  type DocumentOrigin,
  documentOriginLabels,
  type DocumentType,
  documentTypeLabels,
} from "@/constants/document";
import { type legalDocuments as legalDocumentsTable } from "@/server/db/schema";
import { type ColumnDef } from "@tanstack/react-table";
import { type InferSelectModel } from "drizzle-orm";
import { DataTableRowActions } from "./table-row-actions";

type LegalDocument = InferSelectModel<typeof legalDocumentsTable> & {
  employeeName: string;
  documentFileId: string | null;
  documentFileName: string | null;
};

export const columns: ColumnDef<LegalDocument>[] = [
  {
    accessorKey: "id",
    enableHiding: true,
  },
  {
    accessorKey: "issuerId",
    enableHiding: true,
  },
  {
    accessorKey: "documentNumber",
    header: "Document Number",
  },
  {
    accessorKey: "employeeName",
    header: "Issued By",
    cell: ({ getValue }) => {
      if (!getValue()) return <span className="text-gray-400">N/A</span>;

      return getValue() as string;
    },
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
      if (!getValue())
        return <span className="text-gray-400">Non-Expiring</span>;

      const rawDate = new Date(getValue() as string);
      const formattedDate = rawDate.toLocaleDateString("en-US");
      return formattedDate;
    },
  },
  {
    accessorKey: "documentFileId",
    header: undefined,
  },
  {
    accessorKey: "documentFileName",
    header: undefined,
  },
  {
    accessorKey: "actions",
    header: undefined,
    cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
  },
];
