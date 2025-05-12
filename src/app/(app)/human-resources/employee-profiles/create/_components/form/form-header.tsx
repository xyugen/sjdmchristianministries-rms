"use client";

import { Button } from "@/components/ui/button";
import { PageRoutes } from "@/constants/page-routes";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const FormHeader = () => {
  const router = useRouter();

  const handleBackButton = () => {
    router.push("");
  };

  return (
    <div className="flex items-center gap-4 mt-6">
      <Button
        variant="outline"
        size="icon"
        title="back"
        onClick={handleBackButton}
      >
        <ChevronLeft className="size-6" />
      </Button>
      <div>
        <small className="text-muted-foreground">Back to Employee</small>

        <h2 className="text-lg font-semibold leading-tight">
          Add Employee
        </h2>
      </div>
    </div>
  );
};

export default FormHeader;
