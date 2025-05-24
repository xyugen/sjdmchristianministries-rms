import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogProps } from "@radix-ui/react-dialog";
import type { Row } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trainingFormSchema } from "../../create/_components/schema/schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { api } from "@/trpc/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  const form = useForm<z.infer<typeof trainingFormSchema>>({
    resolver: zodResolver(trainingFormSchema),
    defaultValues: {
      employeeId: row.getValue("employeeId"),
      trainingName: row.getValue("trainingName"),
      dateCompleted: row.getValue("dateCompleted"),
    },
  });
  const { data: employees } = api.humanResource.getAllEmployees.useQuery();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

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
                name="employeeId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an employee" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees?.map((employee) => (
                          <SelectItem key={employee.id} value={employee.id}>
                            {employee.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
