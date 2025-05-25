"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { api } from "@/trpc/react";
import { Skeleton } from "@/components/ui/skeleton";

export const UserCard = () => {
  const { data: users, isLoading: isUsersLoading } =
    api.auth.getAllUserCount.useQuery();

  return (
    <Card className="w-80 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Users className="size-6 text-purple-600" />
          Users
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <div className="my- flex flex-col">
            {isUsersLoading ? (
              <Skeleton className="h-28 w-28 animate-pulse rounded bg-gray-300" />
            ) : (
              <div className="flex justify-center text-8xl font-semibold">
                {users ?? 0}
              </div>
            )}
            <div className="mt-10 text-center">
              <h1 className="text-lg font-semibold">Total Active Members</h1>
              <p className="text-sm text-muted-foreground">
                Currently registered users with active accounts in your platform
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
