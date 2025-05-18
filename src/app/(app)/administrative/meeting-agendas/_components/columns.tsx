import { Checkbox } from "@/components/ui/checkbox";
import { type InferSelectModel } from "@/server/db";
import { meetingAgendas } from "@/server/db/schema";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./table-row-actions";

type meetingAgendas = InferSelectModel<typeof meetingAgendas>;

export const columns: ColumnDef<meetingAgendas>[] = [
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
    accessorKey: "agenda",
    header: "Agenda",
  },
  {
    accessorKey: "meetingDate",
    header: "Meeting Date",
    cell: ({ getValue }) => {
      const rawDate = new Date(getValue() as string);
      const formattedDate = rawDate.toLocaleDateString("en-US");
      return formattedDate;
    },
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
    cell: ({ getValue }) => {
      const rawDate = new Date(getValue() as string);
      const formattedDate = rawDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return formattedDate;
    },
  },
  {
    accessorKey: "endTime",
    header: "End Time",
    cell: ({ getValue }) => {
      const rawDate = new Date(getValue() as string);
      const formattedDate = rawDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return formattedDate;
    },
  },
  {
    accessorKey: "presidingOfficer",
    header: "Presiding Officer",
  },
  {
    accessorKey: "summary",
    header: "Summary",
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
