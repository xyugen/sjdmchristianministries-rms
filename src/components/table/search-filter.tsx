import { Input } from "@/components/ui/input";
import { type Table } from "@tanstack/react-table";
import React from "react";

interface SearchFilterProps<TData> {
  table: Table<TData>;
  column: string;
}

const SearchFilter = <TData,>({ table, column }: SearchFilterProps<TData>) => {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Document Title..."
        value={(table.getColumn(column)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(column)?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
    </div>
  );
};

export default SearchFilter;
