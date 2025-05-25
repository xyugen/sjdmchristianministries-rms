"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { HandCoins } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
export const BalanceCard = () => {
  const { data, isLoading } = api.finance.getCurrentFund.useQuery();
  return (
    <Card className="my-3 shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HandCoins className="size-6 text-blue-600" />
          Current Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center">
          <div className="text-3xl font-semibold">
            {isLoading || !data ? (
              <Skeleton className="h-8 w-40 animate-pulse rounded bg-gray-100" />
            ) : (
              (data.currentFund as number).toLocaleString("en-PH", {
                style: "currency",
                currency: "PHP",
              })
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
