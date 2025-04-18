"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { category: "Offering", earnings: 2400, color: "var(--chart-offering)" },  
  { category: "Pledge", earnings: 400, color: "var(--chart-pledge)" },
  { category: "Donation", earnings: 940, color: "var(--chart-donation)" },  
]

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

} satisfies ChartConfig

export function DonutChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.earnings, 0)
  }, [])

  return (
    <Card className="flex flex-col border-none shadow-none px-8">
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
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Earnings
                        </tspan>
                      </text>
                    )
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
  )
}

export default DonutChart;