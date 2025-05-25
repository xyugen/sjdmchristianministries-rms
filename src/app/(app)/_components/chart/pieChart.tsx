"use client";

import { TrendingUp } from "lucide-react";
import * as React from "react";
import { Label, Pie, PieChart, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { category: "Offering", earnings: 400, color: "var(--color-offering)" },
  { category: "Pledge", earnings: 400, color: "var(--color-pledge)" },
  { category: "Donation", earnings: 540, color: "var(--color-donation)" },
];

const chartConfig = {
  earnings: {
    label: "Earnings",
  },
  offering: {
    label: "Offering",
    color: "hsl(var(--chart-1))",
  },
  pledge: {
    label: "Pledge",
    color: "hsl(var(--chart-2))",
  },
  donation: {
    label: "Donation",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function DonutChart() {
  const totalEarnings = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.earnings, 0);
  }, []);

  return (
    <Card className="flex flex-col rounded-sm border-none px-12 shadow-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Earnings</CardTitle>
        <CardDescription>January - April 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="earnings"
              nameKey="category"
              innerRadius={63}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <Label
                content={({ viewBox }) => {
                  const viewBoxType = viewBox as { cx: number; cy: number };
                  if (
                    viewBoxType &&
                    "cx" in viewBoxType &&
                    "cy" in viewBoxType
                  ) {
                    return (
                      <text
                        x={viewBoxType.cx}
                        y={viewBoxType.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBoxType.cx}
                          y={viewBoxType.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {"₱ " + totalEarnings.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBoxType.cx}
                          y={(viewBoxType.cy ?? 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Earnings
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total earnings for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

export default DonutChart;
