"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { z } from "zod";
import { trainingFormSchema } from "../schema/schema";

export function TrainingForm() {
  const { data: employees } = api.humanResource.getAllEmployees.useQuery();
  const { mutateAsync, isPending } =
    api.humanResource.createEmployeeTraining.useMutation();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const form = useForm({
    resolver: zodResolver(trainingFormSchema),
    defaultValues: {
      employeeId: "",
      trainingName: "",
      dateCompleted: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof trainingFormSchema>) {
    const toastId = toast.loading("Recording training...");
    try {
      await mutateAsync({
        ...data,
        dateCompleted: format(data.dateCompleted, "yyyy-MM-dd"),
      });
      toast.success("Training recorded successfully!", { id: toastId });
      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      }
    }
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Add Employee Training</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        className="w-[240px] justify-start text-left font-normal"
                      >
                        {selectedDate ? (
                          format(selectedDate, "PPP")
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
            <div className="flex justify-end">
              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={isPending}
              >
                {isPending ? "Recording..." : "Record Training"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
