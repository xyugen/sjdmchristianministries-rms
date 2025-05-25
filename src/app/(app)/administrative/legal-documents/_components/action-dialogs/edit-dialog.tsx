import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DOCUMENT_ORIGIN,
  DOCUMENT_TYPE_BY_CHURCH,
  DOCUMENT_TYPE_TO_CHURCH,
  documentOriginLabels,
  documentTypeByChurchLabels,
  documentTypeToChurchLabels,
} from "@/constants/document";
import { DialogProps } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import type { Row } from "@tanstack/react-table";
import { z } from "zod";
import { createDocumentSchema } from "../../create/_components/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";

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
  const form = useForm<z.infer<typeof createDocumentSchema>>({
    resolver: zodResolver(createDocumentSchema),
    defaultValues: {
      issuerId: row.getValue("issuerId") ?? "",
      documentType: row.getValue("documentType"),
      documentNumber: row.getValue("documentNumber"),
      documentOrigin: row.getValue("documentOrigin"),
      documentFileId: row.getValue("documentFileId"),
      issueDate: row.getValue("issueDate"),
      expiryDate: row.getValue("expiryDate"),
    },
  });

  const { data: employees, isLoading: isEmployeesLoading } =
    api.humanResource.getAllEmployees.useQuery();

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Legal Document Information</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onEdit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="documentNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter document number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="documentOrigin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document Origin</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select document origin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DOCUMENT_ORIGIN.map((origin) => (
                            <SelectItem key={origin} value={origin}>
                              {documentOriginLabels[origin]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="documentType"
                  render={({ field }) => {
                    const documentOrigin = form.watch("documentOrigin");

                    return (
                      <FormItem>
                        <FormLabel>Document Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                          defaultValue={""}
                          disabled={form.watch("documentOrigin") === undefined}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select document type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {documentOrigin === "issued_by_church"
                              ? DOCUMENT_TYPE_BY_CHURCH.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {documentTypeByChurchLabels[type]}
                                  </SelectItem>
                                ))
                              : DOCUMENT_TYPE_TO_CHURCH.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {documentTypeToChurchLabels[type]}
                                  </SelectItem>
                                ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="issuerId"
                  render={({ field }) => {
                    const isDisabled =
                      form.watch("documentOrigin") !== "issued_by_church";

                    return (
                      <FormItem>
                        <FormLabel
                          className={cn(isDisabled && "text-foreground/40")}
                        >
                          Issuer
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                          defaultValue={undefined}
                          disabled={isDisabled || isEmployeesLoading}
                        >
                          <FormControl>
                            <SelectTrigger disabled={isDisabled}>
                              <SelectValue placeholder="Select issuer" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {isEmployeesLoading
                              ? "Loading..."
                              : employees?.map(({ id, name }) => (
                                  <SelectItem key={id} value={id}>
                                    {name}
                                  </SelectItem>
                                ))}
                          </SelectContent>
                        </Select>
                        {!isDisabled && field.value && (
                          <Button
                            variant="outline"
                            className="mt-1 w-full"
                            onClick={() => field.onChange(null)}
                          >
                            Clear issuer
                            <X className="ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        )}
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="issueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Issue Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
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

                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Expiry Date (Optional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        {field.value && (
                          <Button
                            variant="outline"
                            className="mt-1 w-full"
                            onClick={() => field.onChange(null)}
                          >
                            Clear date
                            <X className="ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        )}
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ?? undefined}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Leave empty if the document does not expire
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="documentFileId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Attachment File</FormLabel>
                      {field.value && (
                        <>
                          <div className="mt-1 text-sm text-muted-foreground">
                            File ID: {field.value}
                          </div>
                        </>
                      )}

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
