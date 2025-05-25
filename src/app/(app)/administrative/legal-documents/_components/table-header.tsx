"use client";

import { Button } from "@/components/ui/button";
import { PageRoutes } from "@/constants/page-routes";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();

  const handleCreateDocuments = () => {
    router.push(PageRoutes.DOCUMENTS_CREATE);
  };

  return (
    <div className="flex justify-end">
      <Button onClick={handleCreateDocuments} title="Add documents">
        <CirclePlus />
        <span>Add Documents</span>
      </Button>
    </div>
  );
};

export default Header;
