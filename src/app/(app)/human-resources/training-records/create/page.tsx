import React from "react";
import PageBreadCrumb from "@/components/breadcrumb/page-breadcrumb";
import FormHeader from "./_components/form/form-header";
import { TrainingForm } from "./_components/form/training-form";
import exp from "constants";

const Page = () => {
   return (
      <div className="w-full">
         <PageBreadCrumb
            subPage="Create"
            currentPage="Training Records"
            parentPage="Human Resources Records"
         />

         <FormHeader />
         <TrainingForm />
      </div>
   );
};

export default Page;