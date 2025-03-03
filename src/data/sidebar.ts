import { FolderDown, FileLock2  } from "lucide-react";

export const RecordMenuItems = [
    {
      title: "Administrative Records",
      icon: FileLock2,
      isActive: false,
      items: [
        {
          title: "Organizational Policies & Procedures",
          url: "#",
        },
        {
          title: "Meeting Minutes & Agendas",
          url: "#",
        },
        {
          title: "Legal Documents",
          url: "#",
        },
      ],
    },
    {
      title: "Human Resources Records",
      icon: FolderDown,
      isActive: false,
      items: [
        {
          title: "Employee Profiles & Personal Information",
          url: "#",
        },
        {
          title: "Training & Development Records",
          url: "#",
        },
      ],
    },
    {
      title: "Financial Records",
      icon: FolderDown,
      isActive: false,
      items: [
        {
          title: "Budget Reports & Financial Statements",
          url: "#",
        },
        {
          title: "Expenses Reports & Invoices",
          url: "#",
        },
        {
          title: "Purchase Orders & Receipts",
          url : "#",
        }
      ],
    },
  ];
  