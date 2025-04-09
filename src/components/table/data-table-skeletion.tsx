"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function DataTableSkeleton() {
  return (
    <div className="mx-auto w-full">
      <div className="flex items-center py-4">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="ml-auto h-8 w-[70px]" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableHead key={index}>
                  <Skeleton className="h-6 w-[100px]" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 8 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: 5 }).map((_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton className="h-6 w-[100px]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-8 w-[200px]" />
      </div>
    </div>
  );
}