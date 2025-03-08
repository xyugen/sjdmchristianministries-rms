import BreadcrumbLayout from '@/components/breadcrumb/page-breadcrumb';
import { Separator } from '@/components/ui/separator';
import { type Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Dashboard",
  };
  
const Page = () => {
  return (
    <div className="flex flex-col">
      <div className="flex text-center mt-1">
        <Separator orientation="vertical" className="mr-2.5 ml-1 h-5" />
        <BreadcrumbLayout currentPage="Dashboard"  />
      </div>

      
    </div>
  )
}

export default Page