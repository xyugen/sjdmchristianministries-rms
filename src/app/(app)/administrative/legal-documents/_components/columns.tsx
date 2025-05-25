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
import { DataTableRowActions } from "./table-row-actions";

type LegalDocument = InferSelectModel<typeof legalDocumentsTable> & {
  employeeName: string;
  documentFileId: string | null;
  documentFileName: string | null;
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
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
