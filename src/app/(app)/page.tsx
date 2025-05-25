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
    <div className="flex w-full flex-col space-y-4">
      <BreadcrumbLayout currentPage="Dashboard" />
      <InfoCard />
      <div className="md: mb-4 grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-3">
        <UserCard />
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200">
          <DonutChart />
        </div>
        <BalanceCard />
      </div>
      <MeetingAgendaTable />
    </div>
  );
};

export default Page;
