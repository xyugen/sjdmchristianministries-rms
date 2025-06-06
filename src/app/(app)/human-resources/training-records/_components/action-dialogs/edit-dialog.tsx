import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { type DialogProps } from "@radix-ui/react-dialog";
import type { Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { trainingFormSchema } from "../../create/_components/schema/schema";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
type EditDialogProps<TData> = DialogProps & {
  onEdit: (data: z.infer<typeof trainingFormSchema>) => void;
  row: DataTableRowActionsProps<TData>["row"];
};

export function EditDialog<TData>({
  onEdit,
  row,
  ...props
}: EditDialogProps<TData>) {
  const form = useForm<z.infer<typeof trainingFormSchema>>({
    resolver: zodResolver(trainingFormSchema),
    defaultValues: {
      employeeId: row.getValue("employeeId"),
      trainingName: row.getValue("trainingName"),
      dateCompleted: row.getValue("dateCompleted"),
    },
  });

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Training Record</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onEdit)} className="space-y-6">
              <FormField
                name="trainingName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Training Name</FormLabel>
                    <Input {...field} placeholder="Enter training name" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="dateCompleted"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date Completed</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Edit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
