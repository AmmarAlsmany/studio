"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartTooltip, ChartTooltipContent, ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

// Sample data - replace with actual data
// Activity: 1 (Low), 2 (Normal), 3 (High)
// Sleep: Hours
// Appetite: 1 (Decreased), 2 (Normal), 3 (Increased)
const activityData = [
  { date: "Mon", activity: 2, sleep: 7, appetite: 2 },
  { date: "Tue", activity: 1, sleep: 6, appetite: 1 },
  { date: "Wed", activity: 3, sleep: 8, appetite: 3 },
  { date: "Thu", activity: 2, sleep: 7.5, appetite: 2 },
  { date: "Fri", activity: 2, sleep: 6.5, appetite: 2 },
  { date: "Sat", activity: 1, sleep: 9, appetite: 1 },
  { date: "Sun", activity: 3, sleep: 7, appetite: 3 },
];

const chartConfig = {
  activity: {
    label: "Activity Level", // 1=Low, 2=Normal, 3=High
    color: "hsl(var(--chart-3))",
  },
  sleep: {
    label: "Sleep (Hours)",
    color: "hsl(var(--chart-4))",
  },
  appetite: {
    label: "Appetite Level", // 1=Decreased, 2=Normal, 3=Increased
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function ActivityPatternsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Activity Patterns</CardTitle>
        <CardDescription>Your activity, sleep, and appetite trends over the past week.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={activityData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis domain={[0, 'auto']} tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line type="monotone" dataKey="activity" stroke="var(--color-activity)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="sleep" stroke="var(--color-sleep)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="appetite" stroke="var(--color-appetite)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
