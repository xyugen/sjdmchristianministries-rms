"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/trpc/react";
import { type Row, type Table } from "@tanstack/react-table";
import { Delete, MoreHorizontal, Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { type z } from "zod";
import { type formSchema } from "../create/_components/schema/schema";
import { DeleteDialog } from "./action-dialogs/delete-dialog";
import { EditDialog } from "./action-dialogs/edit-dialog";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  table: Table<TData>;
}

export function DataTableRowActions<TData>({
  row,
  table,
}: DataTableRowActionsProps<TData>) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const { mutateAsync: editMutation } =
    api.administrative.editMeetingAgenda.useMutation();
  const { mutateAsync: deleteMutation } =
    api.administrative.deleteMeetingAgenda.useMutation();

  const handleDelete = async () => {
    toast.promise(
      deleteMutation({
        id: row.getValue("id"),
      }),
      {
        loading: "Deleting agenda...",
        success: () => {
          (table.options.meta as { refetch: () => void }).refetch();
          return "Agendas deleted successfully!";
        },
        error: (error: unknown) => {
          return (error as Error).message;
        },
      },
    );
    setIsDeleteDialogOpen(false);
  };

  const handleEdit = async (data: z.infer<typeof formSchema>) => {
    toast.promise(
      editMutation({
        id: row.getValue("id"),
        data: {
          ...data,
          meetingDate: new Date(data.meetingDate),
          startTime: data.startTime ? new Date(data.startTime) : undefined,
          endTime: data.endTime ? new Date(data.endTime) : undefined,
        },
      }),
      {
        loading: "Editing agendas...",
        success: () => {
          (table.options.meta as { refetch: () => void }).refetch();
          return "Agendas edited successfully!";
        },
        error: (error: unknown) => {
          return (error as Error).message;
        },
      },
    );

    setIsEditDialogOpen(false);
  };

  return (
    <>
      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={handleDelete}
      />

      <EditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onEdit={handleEdit}
        row={row}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => setIsEditDialogOpen(true)}
            className="flex justify-between"
          >
            <span>Edit</span>
            <Pencil />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsDeleteDialogOpen(true)}
            className="flex justify-between"
          >
            <span>Delete</span>
            <Delete />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
