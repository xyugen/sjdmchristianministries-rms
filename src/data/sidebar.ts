import { PageRoutes } from "@/constants/page-routes";
import { FileLock2, Users } from "lucide-react";

export const RecordMenuItems = [
    {
      title: "Administrative Records",
      icon: FileLock2,
      isActive: false,
      items: [
        {
          title: "Policies & Procedures",
          url: PageRoutes.ORGANIZATIONAL_POLICIES,
        },
        {
          title: "Meeting Agendas",
          url: PageRoutes.MEETING_AGENDAS,
        },
        {
          title: "Legal Documents",
          url: PageRoutes.LEGAL_DOCUMENTS,
        },
      ],
    },
    {
      title: "Human Resources Records",
      icon: Users,
      isActive: false,
      items: [
        {
          title: "Employee Profiles",
          url: PageRoutes.EMPLOYEE_PROFILES,
        },
        {
          title: "Training Records",
          url: PageRoutes.TRAINING_RECORDS,
        },
      ],
    },
  ];
  