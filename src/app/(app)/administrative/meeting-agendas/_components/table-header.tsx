"use client";

import { Button } from "@/components/ui/button";
import { PageRoutes } from "@/constants/page-routes";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();

  const handleCreateMeetingAgendas = () => {
    router.push(PageRoutes.MEETING_AGENDAS_CREATE);
  };

  return (
    <div className="flex justify-end">
      <Button onClick={handleCreateMeetingAgendas} title="Add Meeting Agenda">
        <CirclePlus />
        <span>Add Meeting Agendas</span>
      </Button>
    </div>
  );
};

export default Header;
