import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import type { Row } from "@tanstack/react-table";
import { z } from "zod";
import { createDocumentSchema } from "../../create/_components/schema";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
type EditDialogProps<TData> = DialogProps & {
  onEdit: (data: z.infer<typeof createDocumentSchema>) => void;
  row: DataTableRowActionsProps<TData>["row"];
};
export function EditDialog<TData>({
  onEdit,
  row,
  ...props
}: EditDialogProps<TData>) {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Legal Document Information</DialogTitle>
        </DialogHeader>
        <div></div>
      </DialogContent>
    </Dialog>
  );
}
