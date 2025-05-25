"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HandCoins } from "lucide-react";
import { api } from "@/trpc/react";
import { Skeleton } from "@/components/ui/skeleton";

export const BalanceCard = () => {
  const { data: balance, isLoading: isBalanceLoading } =
    api.finance.getCurrentFund.useQuery();

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="text-md flex items-center gap-2 font-semibold md:text-lg">
          <HandCoins className="size-5 text-green-600 md:size-6" />
          Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <div className="mt-7 flex flex-col items-center">
            {isBalanceLoading ? (
              <Skeleton className="h-28 w-28 animate-pulse rounded bg-gray-300" />
            ) : (
              <div className="flex justify-center text-xl font-semibold md:text-3xl">
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
                <h1 className="text-md font-semibold md:text-lg">
                  Current Balance
                </h1>
              )}
              {isBalanceLoading ? (
                <Skeleton className="mt-1 h-4 w-40 animate-pulse rounded bg-gray-300" />
              ) : (
                <div className="text-xs text-muted-foreground md:text-sm">
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
