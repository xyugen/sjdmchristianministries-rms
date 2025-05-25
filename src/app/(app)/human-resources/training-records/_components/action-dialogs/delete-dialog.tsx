import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type DialogProps } from "@radix-ui/react-dialog";
import { TriangleAlert } from "lucide-react";

export function DeleteDialog({
  onDelete,
  ...props
}: DialogProps & { onDelete: () => void }) {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this record?
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex items-center gap-x-1.5">
          <TriangleAlert className="text-red-500" />
          <span>this action cannot be undone</span>
        </DialogDescription>
        <DialogFooter className="flex flex-col gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="destructive" onClick={onDelete}>
            Yes, Delete It
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
