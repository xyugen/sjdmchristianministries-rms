"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, HandCoins, BookMarked } from "lucide-react";
import { api } from "@/trpc/react";

export const InfoCard = () => {
  const { data: users, isLoading } = api.auth.getAllUserCount.useQuery();
  const donations = 2000;
  const pledges = 1000;

  return (
    <div className="border-r-1 grid grid-cols-3 gap-3">
      <Card className="my-3 shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="size-6 text-yellow-500" />
            Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center">
            <div className="text-3xl font-semibold">
              {isLoading ? "..." : users}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="my-3 shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <HandCoins className="size-6 text-red-500" />
            Donations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center">
            <div className="text-3xl font-semibold">
              {new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(donations)}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="my-3 shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookMarked className="size-6 text-blue-500" />
            Pledges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center">
            <div className="text-3xl font-semibold">
              {new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(pledges)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
