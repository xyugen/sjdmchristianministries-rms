"use client"

import { Button } from "@/components/ui/button";
import { PageRoutes } from "@/constants/page-routes";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();

  const handleCreateEmployee =  () => {
     router.push("");
  }

  return (
    <div className="flex justify-end">
      <Button onClick={handleCreateEmployee}
        title="Add Employee"
      >
        <CirclePlus />
        <span>Add Employee</span>
      </Button>
    </div>
  );
};

export default Header;
