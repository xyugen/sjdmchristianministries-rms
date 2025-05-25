"use client";

import { Button } from "@/components/ui/button";
import { PageRoutes } from "@/constants/page-routes";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
   const router = useRouter();

   const handleCreateTrainingRecord =  () => {
      router.push(PageRoutes.TRAINING_RECORDS_CREATE);
   }

   return (
      <div className="flex justify-end">
         <Button onClick={handleCreateTrainingRecord}
            title="Add Training Record"
         > 
            <CirclePlus /> 
            <span>Add Training Record</span>
         </Button>
      </div>
   );
};

export default Header;