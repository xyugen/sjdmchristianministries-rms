"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";
import { createDocumentSchema } from "./schema";
import { useRouter } from "next/navigation";
import { PageRoutes } from "@/constants/page-routes";

const CreateDocumentForm = () => {
  const { mutateAsync, isPending } =
    api.administrative.createLegalDocument.useMutation();

  const { mutateAsync: mutateAsyncUpload, isPending: isPendingUpload } =
    api.administrative.uploadLegalDocumentFile.useMutation();

  const { data: employees, isLoading: isEmployeesLoading } =
    api.humanResource.getAllEmployees.useQuery();

  const form = useForm<z.infer<typeof createDocumentSchema>>({
    resolver: zodResolver(createDocumentSchema),
  });
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof createDocumentSchema>) => {
    const toastId = toast.loading("Adding document...");
    try {
      const response = await mutateAsync({
        ...values,
      });
      if (response?.lastInsertRowid) {
        toast.success("Document added successfully!", { id: toastId });
        form.reset();
        router.push(PageRoutes.LEGAL_DOCUMENTS);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        toast.error(error.message, { id: toastId });
      }
    }
  };

  const documentOrigin = form.watch("documentOrigin");

  useEffect(() => {
    if (documentOrigin === "issued_by_church") {
      form.setValue("issuerId", undefined);
      form.setValue("documentType", "marriage_certificate");
    } else {
      form.setValue("issuerId", undefined);
      form.setValue("documentType", "legal_registration");
    }
  }, [documentOrigin, form]);

  return (
    <Card className="mt-2 !w-full">
      <CardHeader>
        <CardTitle>Create Document</CardTitle>
        <CardDescription>
          Enter the details for the new document.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          const toastId = toast.loading(
                            "Uploading document...",
                          );

                          if (file.type !== "application/pdf") {
                            toast.error(
                              "Invalid file type. Please upload a PDF file.",
                              {
                                id: toastId,
                              },
                            );
                            return;
                          }

                          const formData = new FormData();
                          formData.append("file", file);

                          try {
                            const response = await mutateAsyncUpload(formData);

                            if (response) {
                              field.onChange(response);
                              toast.success("Document added successfully!", {
                                id: toastId,
                              });
                            } else {
                              toast.error(
                                "Failed to upload document. Please try again.",
                                {
                                  id: toastId,
                                },
                              );
                              console.error("Upload failed:", response);
                            }
                          } catch (err) {
                            toast.error(
                              "Failed to upload document. Please try again.",
                              {
                                id: toastId,
                              },
                            );
                            console.error("Error uploading file:", err);
                          }
                        }}
                        disabled={isPendingUpload}
                      />
                    </FormControl>

                    {field.value && (
                      <>
                        <div className="mt-1 text-sm text-muted-foreground">
                          File ID: {field.value}
                        </div>
                        <Button
                          variant="outline"
                          className="mt-1 w-full"
                          onClick={() => field.onChange(undefined)}
                        >
                          Clear
                          <X className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Document"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateDocumentForm;
