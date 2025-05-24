"use client";
import { useState } from "react";
import type React from "react";

import { Search, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export default function PoliciesProcedure() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const [editingPolicy, setEditingPolicy] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deletingPolicy, setDeletingPolicy] = useState<any>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const { data, refetch } =
    api.administrative.getAllOrganizationalPolicies.useQuery();

  const updatePolicyMutation =
    api.administrative.editOrganizationalPolicy.useMutation({
      onSuccess: () => {
        toast.success("Policy updated successfully");
        refetch();
        setIsEditDialogOpen(false);
        setEditingPolicy(null);
        setEditTitle("");
        setEditDescription("");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update policy");
      },
    });

  const deletePolicyMutation =
    api.administrative.deleteOrganizationalPolicy.useMutation({
      onSuccess: () => {
        toast.success("Policy deleted successfully");
        refetch();
        setDeletingPolicy(null);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete policy");
      },
    });

  const filteredPolicies =
    data?.filter((policy) => {
      const matchesSearch =
        policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    }) ?? [];

  const handleEdit = (policy: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPolicy(policy);
    setEditTitle(policy.title);
    setEditDescription(policy.description);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (policy: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingPolicy(policy);
  };

  const confirmDelete = () => {
    if (deletingPolicy) {
      deletePolicyMutation.mutate({ id: deletingPolicy.id });
    }
  };
  const saveEdit = () => {
    if (editingPolicy && editTitle.trim() && editDescription.trim()) {
      updatePolicyMutation.mutate(
        {
          id: editingPolicy.id,
          data: {
            title: editTitle.trim(),
            description: editDescription.trim(),
          },
        },
        {
          onSuccess: () => {
            toast.success("Policy updated successfully");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to update policy");
          },
        },
      );
    }
  };

  return (
    <div className="flex flex-col overflow-auto">
      <div className="p-6">
        {/* Search */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Search policies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="list">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <div className="space-y-4">
              {filteredPolicies.map((policy) => (
                <Card
                  key={policy.id}
                  className="cursor-pointer transition-shadow hover:shadow-md"
                  onClick={() => setSelectedPolicy(policy)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">
                          {policy.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {policy.description}
                        </CardDescription>
                      </div>
                      <div className="ml-4 flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleEdit(policy, e)}
                          disabled={updatePolicyMutation.isPending}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleDelete(policy, e)}
                          disabled={deletePolicyMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="grid">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPolicies.map((policy) => (
                <Card
                  key={policy.id}
                  className="cursor-pointer transition-shadow hover:shadow-md"
                  onClick={() => setSelectedPolicy(policy)}
                >
                  <CardHeader>
                    <div className="mb-2 flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">
                          {policy.title}
                        </CardTitle>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleEdit(policy, e)}
                          disabled={updatePolicyMutation.isPending}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleDelete(policy, e)}
                          disabled={deletePolicyMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription>{policy.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Policy Detail Modal */}
      {selectedPolicy && (
        <Dialog
          open={!!selectedPolicy}
          onOpenChange={() => setSelectedPolicy(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {selectedPolicy.title}
              </DialogTitle>
              <DialogDescription className="mt-2 text-base leading-relaxed">
                {selectedPolicy.description}
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end pt-4">
              <Button onClick={() => setSelectedPolicy(null)}>Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Policy Modal */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Policy</DialogTitle>
            <DialogDescription>
              Update the policy information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Policy Title</Label>
              <Input
                id="edit-title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Enter policy title"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Brief description of the policy"
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                disabled={updatePolicyMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={saveEdit}
                disabled={
                  updatePolicyMutation.isPending ||
                  !editTitle.trim() ||
                  !editDescription.trim()
                }
              >
                {updatePolicyMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingPolicy}
        onOpenChange={() => setDeletingPolicy(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              policy "{deletingPolicy?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletePolicyMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deletePolicyMutation.isPending}
            >
              {deletePolicyMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
