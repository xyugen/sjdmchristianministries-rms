"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HandCoins } from "lucide-react";
import { api } from "@/trpc/react";
import { Skeleton } from "@/components/ui/skeleton";

export const BalanceCard = () => {
  const { data: balance, isLoading: isBalanceLoading } =
    api.finance.getCurrentFund.useQuery();

  return (
    <Card className="w-full shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <HandCoins className="size-6 text-green-600" />
          Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <div className="mt-7 flex flex-col items-center">
            {isBalanceLoading ? (
              <Skeleton className="h-28 w-28 animate-pulse rounded bg-gray-300" />
            ) : (
              <div className="flex justify-center text-3xl font-semibold">
                {balance?.currentFund.toLocaleString("en-PH", {
                  style: "currency",
                  currency: "PHP",
                })}
              </div>
            )}
            <div className="mt-10 text-center">
              {isBalanceLoading ? (
                <Skeleton className="h-6 w-40 animate-pulse rounded bg-gray-300" />
              ) : (
                <h1 className="text-lg font-semibold">Current Balance</h1>
              )}
              {isBalanceLoading ? (
                <Skeleton className="mt-1 h-4 w-40 animate-pulse rounded bg-gray-300" />
              ) : (
                <div className="text-sm text-muted-foreground">
                  Current balance of SJDM Christian Ministries
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
