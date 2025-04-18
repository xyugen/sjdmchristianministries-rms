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
    label: "Admin",
    value: "Admin",
  },
  {
    label: "Pastor",
    value: "Pastor",  
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
          placeholder="Search name..."
          value={
            (table.getColumn("name")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("name")
              ?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("role") && (
          <DataTableFacetedFilter
            column={table.getColumn("role")}
            title="Role"
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

