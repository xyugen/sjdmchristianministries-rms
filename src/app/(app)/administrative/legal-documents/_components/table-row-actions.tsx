"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ApiRoutes from "@/constants/api-routes";
import { bufferToBlob, streamToBuffer } from "@/lib/utils";
import type { Row } from "@tanstack/react-table";
import { Delete, Download, MoreHorizontal, Pencil } from "lucide-react";
import { useState } from "react";
import { DeleteDialog } from "./action-dialogs/delete-dialog";
import { EditDialog } from "./action-dialogs/edit-dialog";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const handleDelete = async () => {
    //TODO: add delete logic

    setIsDeleteDialogOpen(false);
  };

  const handleEdit = async () => {
    //TODO: add edit logic

    setIsEditDialogOpen(false);
  };

  const handleDownload = async () => {
    const documentFileId: string = row.getValue("documentFileId");

    const response = await fetch(
      `${ApiRoutes.DOWNLOAD_LEGAL_DOCUMENT_FILE}/${documentFileId}`,
      { method: "GET" },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const buffer = await streamToBuffer(response.body!);
    const blob = bufferToBlob(buffer);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = row.getValue("documentFileName");
    link.click();
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
          <DropdownMenuItem
            onClick={() => setIsDeleteDialogOpen(true)}
            className="flex justify-between"
          >
            <span>Delete</span>
            <Delete />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleDownload}
            className="flex justify-between"
          >
            <span>Download</span>
            <Download />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
