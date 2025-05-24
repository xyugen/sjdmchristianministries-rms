import React from "react";
import BreadcrumbLayout from "@/components/breadcrumb/page-breadcrumb";
import { type Metadata } from "next";
import { ArrowUp, ArrowDown } from "lucide-react";
import DonutChart from "./_components/chart/pieChart";
import UtilityExpenses from "./_components/utility-expenses";
import { InfoCard } from "./_components/panel/info-card";
import MeetingAgendaTable, {
  type MeetingAgenda,
} from "./_components/table/meeting-agendas";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Page = () => {
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
      <InfoCard />
      <div className="border-gray mt-5 flex flex-col items-center justify-center rounded-sm border pb-4 sm:flex-row lg:py-2">
        <DonutChart />
      </div>
      <MeetingAgendaTable agendas={meetingAgendas} />
    </div>
  );
};

export default Page;
