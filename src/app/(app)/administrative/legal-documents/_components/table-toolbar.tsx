"use client";

import { type Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { DataTableFacetedFilter } from "@/components/table/table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

//Sample options
const SampleDocuments = [
  {
    label: "Christian Ministry Policies and Procedures",
    value: "Christian Ministry Policies and Procedures",
  },
  {
    label: "Legal Document",
    value: "Legal Document",
  },
];

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between gap-x-2 mb-1.5">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search Issued by..."
          value={
            (table.getColumn("issuedBy")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("issuedBy")
              ?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("docType") && (
          <DataTableFacetedFilter
            column={table.getColumn("docType")}
            title="Document Type"
            options={SampleDocuments}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
    </div>
  );
}
