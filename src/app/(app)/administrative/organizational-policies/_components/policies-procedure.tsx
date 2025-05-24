"use client";
import { useState } from "react";
import { Search, FileText, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

export default function PoliciesProcedure() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const { data } = api.administrative.getAllOrganizationalPolicies.useQuery();

  const filteredPolicies =
    data?.filter((policy) => {
      const matchesSearch =
        policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    }) ?? [];

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
                    <CardTitle className="text-lg">{policy.title}</CardTitle>
                    <CardDescription>{policy.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

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
    </div>
  );
}
