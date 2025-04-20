import React from "react";
import BreadcrumbLayout from "@/components/breadcrumb/page-breadcrumb";
import { type Metadata } from "next";
import { ArrowUp, ArrowDown } from "lucide-react";
import DonutChart from "./_components/chart/pieChart";
import UtilityExpenses from "./_components/utility-expenses";
import MeetingAgendaTable, {
  type MeetingAgenda,
} from "./_components/table/meeting-agendas";

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

  //Example Data for meeting-agendas
  const meetingAgendas: MeetingAgenda[] = [
    {
      id: "1",
      date: "April 1, 2025",
      title: "Monthly Ministry Planning Meeting",
      presiding: "Ptr. Jorym",
      startTime: "9:00 AM",
      endTime: "12:00 PM",
    },
    {
      id: "2",
      date: "April 4, 2025",
      title: "Youth Fellowship Coordination",
      presiding: "Ptr. Darvey",
      startTime: "9:00 AM",
      endTime: "12:00 PM",
    },
    {
      id: "3",
      date: "April 13, 2025",
      title: "Financial & Budget Planning Session",
      presiding: "Sis. Mary Elisha",
      startTime: "9:00 AM",
      endTime: "12:00 PM",
    },
    {
      id: "4",
      date: "April 20, 2025",
      title: "Monthly Ministry Planning Meeting",
      presiding: "Bro. Al-v",
      startTime: "9:00 AM",
      endTime: "12:00 PM",
    },
    {
      id: "5",
      date: "April 24, 2025",
      title: "Outreach Event Strategy Meeting",
      presiding: "Doc. Jared",
      startTime: "9:00 AM",
      endTime: "12:00 PM",
    },
    {
      id: "6",
      date: "April 30, 2025",
      title: "Mid-Year Ministry Review & Evaluation",
      presiding: "Ptr. LeBron",
      startTime: "9:00 AM",
      endTime: "12:00 PM",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-1">
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
                  <ArrowUp className="mr-1 rounded-xl bg-green-300" size={16} />
                ) : (
                  <ArrowDown
                    className="mr-1 rounded-xl bg-yellow-300"
                    size={16}
                  />
                )}
                {stat.change}%
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">Compared to last week</p>
          </div>
        ))}
      </div>
      <div className="mt-1 flex gap-x-1">
        <DonutChart />
        <UtilityExpenses />
      </div>
      <MeetingAgendaTable agendas={meetingAgendas} />
    </div>
  );
};

export default Page;
