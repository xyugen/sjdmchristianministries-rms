import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import type { Row } from "@tanstack/react-table";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
type EditDialogProps<TData> = DialogProps & {
  onEdit: () => void;
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
          <DialogTitle>Edit Transaction Information</DialogTitle>
        </DialogHeader>
        <div></div>
      </DialogContent>
    </Dialog>
  );
}
