"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SelectUtility from "./select/select-utility";
import ExpensesTable from "./table/expenses-table";

interface UtilityExpense {
  id: string;
  name: string;
  type: string;
  amount: string;
  date: string;
}

export default function UtilityExpenses() {
  const expenses: UtilityExpense[] = [
    {
      id: "1",
      name: "Meralco",
      type: "Electric Utilities",
      amount: "PHP 1200",
      date: "4/16/2025",
    },
    {
      id: "2",
      name: "Prime Water",
      type: "Water Utilities",
      amount: "PHP 1200",
      date: "4/16/2025",
    },
    {
      id: "3",
      name: "Converge ICT",
      type: "Cable/Internet",
      amount: "PHP 1200",
      date: "4/16/2025",
    },
    {
      id: "4",
      name: "Meralco",
      type: "Electric Utilities",
      amount: "PHP 1200",
      date: "4/16/2025",
    },
  ];

  const utilityOptions = [
    { value: "all", label: "Utility" },
    { value: "electric", label: "Electric" },
    { value: "water", label: "Water" },
    { value: "internet", label: "Internet" },
  ];

  const monthOptions = [
    { value: "current", label: "Month" },
    { value: "january", label: "January" },
    { value: "february", label: "February" },
    { value: "march", label: "March" },
    { value: "april", label: "April" },
  ];

  return (
    <Card className="w-full rounded-sm shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Utility Expenses</CardTitle>
        <div className="flex items-center space-x-2">
          <SelectUtility
            options={utilityOptions}
            defaultValue="all"
            placeholder="Utility"
            onChange={(value) => console.log("Utility changed:", value)}
          />
          <SelectUtility
            options={monthOptions}
            defaultValue="current"
            placeholder="Month"
            onChange={(value) => console.log("Month changed:", value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ExpensesTable expenses={expenses} />
      </CardContent>
    </Card>
  );
}
