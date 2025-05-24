import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogProps } from "@radix-ui/react-dialog";
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
  //   const form = useForm<z.infer<typeof transactionSchema>>({
  //     resolver: zodResolver(transactionSchema),
  //     defaultValues: {},
  //   });

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Training Record</DialogTitle>
        </DialogHeader>
        <div className="mt-2"></div>
      </DialogContent>
    </Dialog>
  );
}
