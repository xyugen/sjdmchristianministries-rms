import BreadcrumbLayout from "@/components/breadcrumb/page-breadcrumb";
import { type Metadata } from "next";
import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Page = () => {
  const statData = [
    {
      title: "New Members",
      value: 22,
      change: 15,
      currency: false,
      isPositive: true,
    },
    {
      title: "Offering",
      value: 21400,
      change: 30,
      currency: true,
      isPositive: true,
    },
    {
      title: "Donation",
      value: 1400,
      change: 3,
      currency: true,
      isPositive: false,
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <BreadcrumbLayout currentPage="Dashboard" />
      {/* Stat Cards */}
      <div className="border-gray mt-5 flex flex-col items-center justify-center rounded-sm border pb-4 sm:flex-row lg:py-2">
        {statData.map((stat, index) => (
          <div
            key={index}
            className={
              index === statData.length - 1
                ? "flex w-full flex-col items-start justify-between p-4 pr-36 sm:w-1/3"
                : "flex w-full flex-col items-start justify-between border-r p-4 pr-36 sm:w-1/3"
            }
          >
            <h3 className="pb-4 text-lg font-medium">{stat.title}</h3>
            <div className="mt-2 flex items-center gap-2 text-3xl font-semibold text-black">
              {stat.currency && <h1>₱</h1>}
              {stat.value}
              <span
                className={`ml-2 flex items-center text-sm ${
                  stat.isPositive ? "text-green-500" : "text-yellow-500"
                }`}
              >
                {stat.isPositive ? (
                  <ArrowUp className="rounded-xl bg-green-300 mr-1" size={16} />
                ) : (
                  <ArrowDown className="rounded-xl bg-yellow-300 mr-1" size={16} />
                )}
                {stat.change}%
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">Compared to last week</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
