"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";
import { formSchema } from "../schema/schema";

const PoliciesForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { mutateAsync, isPending } =
    api.administrative.createOrganizationalPolicy.useMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Adding Policy...");
    try {
      const response = await mutateAsync({
        ...data,
      });
      if (response) {
        toast.success("Policy Created successfully!", {
          id: toastId,
        });
        form.reset();
        setIsDialogOpen(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        toast.error(error.message, { id: toastId });
      }
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus className="h-4 w-4" />
          Add Policy
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Policy</DialogTitle>
          <DialogDescription>
            Create a new policy or procedure document.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Policy Title</Label>
              <Input
                id="title"
                placeholder="Enter policy title"
                {...form.register("title")}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter policy description"
                {...form.register("description")}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="submit" disabled={isPending}>
                Save Policy
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PoliciesForm;
