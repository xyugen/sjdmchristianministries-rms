"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { api } from "@/trpc/react";
import { Skeleton } from "@/components/ui/skeleton";

export const UserCard = () => {
  const { data: users, isLoading: isUsersLoading } =
    api.auth.getAllUserCount.useQuery();

  return (
    <Card className="w-full shadow-none">
      <CardHeader>
        <CardTitle className="text-md flex items-center gap-2 font-semibold md:text-lg">
          <Users className="size-5 text-purple-600 md:size-6" />
          Users
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <div className="mt-7 flex flex-col items-center">
            {isUsersLoading ? (
              <Skeleton className="h-28 w-28 animate-pulse rounded bg-gray-300" />
            ) : (
              <div className="flex justify-center text-3xl font-semibold">
                {users ?? 0}
              </div>
            )}
            <div className="mt-10 text-center">
              {isUsersLoading ? (
                <Skeleton className="h-6 w-40 animate-pulse rounded bg-gray-300" />
              ) : (
                <h1 className="text-md font-semibold md:text-lg">
                  Total Active Employees
                </h1>
              )}
              {isUsersLoading ? (
                <Skeleton className="mt-1 h-4 w-40 animate-pulse rounded bg-gray-300" />
              ) : (
                <div className="text-xs text-muted-foreground md:text-sm">
                  Currently registered employees with active accounts in your
                  platform
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
