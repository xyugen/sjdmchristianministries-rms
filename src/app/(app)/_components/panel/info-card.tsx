"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeDollarSign, HandCoins, BookMarked } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";

export const InfoCard = () => {
  const { data: offering, isLoading: isOfferingLoading } =
    api.finance.getWeeklyInflows.useQuery();
  const { data: donations, isLoading: isDonationsLoading } =
    api.finance.getWeeklyInflows.useQuery();
  const { data: pledges, isLoading: isPledgesLoading } =
    api.finance.getWeeklyInflows.useQuery();

  return (
    <div className="border-r-1 grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-3">
      <Card className="my-3 shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm md:text-lg">
            <BadgeDollarSign className="size-5 text-yellow-500 md:size-6" />
            Offerings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center">
            {isOfferingLoading ? (
              <Skeleton className="h-6 w-40 animate-pulse rounded bg-gray-300" />
            ) : (
              <div className="text-lg font-semibold md:text-3xl">
                {new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(offering?.[1]?.thisWeekAmount ?? 0)}
              </div>
            )}
          </div>
          <div className="mt-2 text-xs font-normal text-gray-400 md:text-sm">
            {isOfferingLoading ? (
              <Skeleton className="h-4 w-16 animate-pulse rounded bg-gray-300" />
            ) : (
              "This weeks amount"
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="my-3 shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm md:text-lg">
            <HandCoins className="size-5 text-red-500 md:size-6" />
            Donations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center">
            {isDonationsLoading ? (
              <Skeleton className="h-6 w-40 animate-pulse rounded bg-gray-300" />
            ) : (
              <div className="text-lg font-semibold md:text-3xl">
                {new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(donations?.[0]?.thisWeekAmount ?? 0)}
              </div>
            )}
          </div>
          <div className="mt-2 text-xs font-normal text-gray-400 md:text-sm">
            {isDonationsLoading ? (
              <Skeleton className="h-4 w-16 animate-pulse rounded bg-gray-300" />
            ) : (
              "This weeks amount"
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="my-3 shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 md:text-lg">
            <BookMarked className="size-5 text-blue-500 md:size-6" />
            Pledges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center">
            {isPledgesLoading ? (
              <Skeleton className="h-6 w-40 animate-pulse rounded bg-gray-300" />
            ) : (
              <div className="text-lg font-semibold md:text-3xl">
                {new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(pledges?.[2]?.thisWeekAmount ?? 0)}
              </div>
            )}
          </div>
          <div className="mt-2 text-xs font-normal text-gray-400 md:text-sm">
            {isPledgesLoading ? (
              <Skeleton className="h-4 w-16 animate-pulse rounded bg-gray-300" />
            ) : (
              "This weeks amount"
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
