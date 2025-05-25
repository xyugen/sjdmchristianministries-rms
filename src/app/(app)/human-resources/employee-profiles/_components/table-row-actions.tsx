"use client";

import type { Row, Table } from "@tanstack/react-table";
import { Delete, Pencil, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EditDialog } from "./action-dialogs/edit-dialog";
import { useState } from "react";
import { DeleteDialog } from "./action-dialogs/delete-dialog";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { z } from "zod";
import { employeeFormSchema } from "../create/_components/schema/schema";

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
  const { mutateAsync: deleteMutation } =
    api.humanResource.deleteEmployee.useMutation();
  const { mutateAsync: editMutation } =
    api.humanResource.editEmployeeInfo.useMutation();

  const handleDelete = async () => {
    toast.promise(
      deleteMutation({
        employeeId: row.getValue("id"),
      }),
      {
        loading: "Deleting employee profile...",
        success: () => {
          (table.options.meta as { refetch: () => void }).refetch();
          return "Employee profile deleted successfully!";
        },
        error: (error: unknown) => {
          return (error as Error).message;
        },
      },
    );
    setIsDeleteDialogOpen(false);
  };

  const handleEdit = async (data: z.infer<typeof employeeFormSchema>) => {
    toast.promise(
      editMutation({
        employeeId: row.getValue("id"),
        data: {
          ...data,
        },
      }),
      {
        loading: "Editing employee profile...",
        success: () => {
          (table.options.meta as { refetch: () => void }).refetch();
          return "Employee profile edited successfully!";
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
