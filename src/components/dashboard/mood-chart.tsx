"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartTooltipContent, ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

// Sample data - replace with actual data
const moodData = [
  { date: "Mon", mood: 3, medicationAdherence: 1 }, // 1 for adhered, 0 for not
  { date: "Tue", mood: 2, medicationAdherence: 1 },
  { date: "Wed", mood: 4, medicationAdherence: 0 },
  { date: "Thu", mood: 3, medicationAdherence: 1 },
  { date: "Fri", mood: 5, medicationAdherence: 1 },
  { date: "Sat", mood: 2, medicationAdherence: 1 },
  { date: "Sun", mood: 4, medicationAdherence: 1 },
]

const chartConfig = {
  mood: {
    label: "Mood (1-5)",
    color: "hsl(var(--chart-1))",
  },
  medicationAdherence: {
    label: "Medication Taken",
    color: "hsl(var(--chart-2))",
  }
} satisfies ChartConfig

export function MoodChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Mood & Medication</CardTitle>
        <CardDescription>Your mood trend and medication adherence over the past week. (1=Awful, 5=Great for mood)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={moodData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis 
              yAxisId="left" 
              orientation="left" 
              stroke="hsl(var(--chart-1))" 
              domain={[0, 5]} 
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="hsl(var(--chart-2))" 
              domain={[0, 1]} 
              tickFormatter={(value) => value === 1 ? 'Yes' : 'No'}
              ticks={[0,1]}
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar yAxisId="left" dataKey="mood" fill="var(--color-mood)" radius={4} />
            <Bar yAxisId="right" dataKey="medicationAdherence" fill="var(--color-medicationAdherence)" radius={4} />
          </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
