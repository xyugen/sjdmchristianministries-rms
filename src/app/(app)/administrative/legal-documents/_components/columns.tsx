import { type ColumnDef } from "@tanstack/react-table";
export type Document = {
  id: string;
  title: string;
  author: string;
  dateCreated: string;
  status: "Pending" | "Approved" | "Draft";
};

export const columns: ColumnDef<Document>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author",
    
  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
