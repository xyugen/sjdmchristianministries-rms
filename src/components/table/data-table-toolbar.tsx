"use client";

import { type Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { DataTableFacetedFilter } from "@/components/table/data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filteredTitle: string;
  filteredColumn?: string;
  options?: {
    label: string;
    value: string;
  }[];
}
import { Search } from "lucide-react";

export const DataTableToolbar = <TData,>({
  table,
  filteredTitle,
  filteredColumn,
  options,
}: DataTableToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="mb-1.5 flex items-center justify-between gap-x-2">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            placeholder={`Search ${filteredTitle}...`}
            value={
              (table.getColumn(filteredTitle)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(filteredTitle)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] pl-10 lg:w-[250px]"
          />
        </div>
        {filteredColumn && options && table.getColumn(filteredColumn) && (
          <DataTableFacetedFilter
            column={table.getColumn(filteredColumn)}
            title={filteredColumn}
            options={options}
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
      <DataTableViewOptions table={table} />
    </div>
  );
};
