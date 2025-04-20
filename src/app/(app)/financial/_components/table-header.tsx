"use client"

import { Button } from "@/components/ui/button";
import { PageRoutes } from "@/constants/page-routes";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();

  const handleCreateDocuments =  () => {
     router.push(PageRoutes.FINANCIAL_CREATE);
  }

  return (
    <div className="flex justify-end">
      <Button onClick={handleCreateDocuments}
        title="Add Transaction"
      >
        <CirclePlus />
        <span>Add Transaction</span>
      </Button>
    </div>
  );
};

export default Header;
