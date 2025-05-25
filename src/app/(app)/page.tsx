import React from "react";
import BreadcrumbLayout from "@/components/breadcrumb/page-breadcrumb";
import { type Metadata } from "next";
import { ArrowUp, ArrowDown, User } from "lucide-react";
import DonutChart from "./_components/chart/pieChart";
import UtilityExpenses from "./_components/utility-expenses";
import { InfoCard } from "./_components/panel/info-card";
import { UserCard } from "./_components/panel/user-card";
import { BalanceCard } from "./_components/panel/balance-card";
import MeetingAgendaTable, {
  type MeetingAgenda,
} from "./_components/table/meeting-agendas";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Page = () => {
  return (
    <div className="flex w-full flex-col gap-1">
      <BreadcrumbLayout currentPage="Dashboard" />
      <InfoCard />
      <div className="grid grid-cols-1 gap-4 pb-4 sm:grid-cols-3">
        <UserCard />
        <div className="border-gray flex flex-col items-center justify-center rounded-xl border pb-4 sm:flex-row lg:py-2">
          <DonutChart />
        </div>
        <BalanceCard />
      </div>

      <MeetingAgendaTable />
    </div>
  );
};

export default Page;
