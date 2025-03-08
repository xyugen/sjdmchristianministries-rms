"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { type ColumnDef } from "@tanstack/react-table";
export type Document = {
  issuedBy: string;
  docType: string;
  docNumber: number;
  issueDate: Date;
  expiryDate: Date;
};

export const columns: ColumnDef<Document>[] = [
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
    accessorKey: "issuedBy",
    header: "Issued By",
  },
  {
    accessorKey: "docType",
    header: "Document Type",
  },
  {
    accessorKey: "docNumber",
    header: "Document Number",
  },
  {
    accessorKey: "issueDate",
    header: "Issue Date",
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
  },
];
