import { MoodChart } from "@/components/dashboard/mood-chart";
import { ActivityPatternsChart } from "@/components/dashboard/activity-patterns-chart";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smile, MessageSquareHeart, Info, CalendarCheck } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const consistencyStreak = 5; // Example data
  const moodDropDetected = true; // Example flag

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-primary/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-primary">Keep Going!</CardTitle>
            <Smile className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              You&apos;ve been consistent for {consistencyStreak} days!
            </div>
            <p className="text-xs text-muted-foreground">
              Great job on tracking your well-being.
            </p>
          </CardContent>
        </Card>

        {moodDropDetected && (
          <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive-foreground">
             <Info className="h-5 w-5 text-destructive shrink-0" />
            <AlertTitle className="text-destructive">Heads Up!</AlertTitle>
            <AlertDescription className="text-destructive/90">
              We&apos;ve noticed a drop in your mood recently. Remember, you&apos;re not alone.
              It might be helpful to talk to someone or check in with your doctor.
              <div className="mt-2">
                <Button asChild variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/20">
                  <Link href="/chat">
                    <MessageSquareHeart className="mr-2 h-4 w-4" /> Talk to AI Support
                  </Link>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </div>

      <MoodChart />
      <ActivityPatternsChart />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CalendarCheck className="h-5 w-5 text-primary"/> Medication Reminders</CardTitle>
          <CardDescription>Stay on track with your medication schedule.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for medication reminders list or status */}
          <p className="text-muted-foreground">Your medication reminders will appear here.</p>
          <div className="mt-2 p-3 bg-muted/50 rounded-md">
            <p className="text-sm font-medium">Sertraline 50mg</p>
            <p className="text-xs text-muted-foreground">Take 1 tablet at 8:00 AM daily.</p>
            <p className="text-sm mt-1 text-green-600 dark:text-green-400 font-semibold">Completed Today ✅</p>
          </div>
          <div className="mt-2 p-3 bg-muted/50 rounded-md">
            <p className="text-sm font-medium">Vitamin D 1000IU</p>
            <p className="text-xs text-muted-foreground">Take 1 capsule at 12:00 PM daily.</p>
            <p className="text-sm mt-1 text-amber-600 dark:text-amber-400 font-semibold">Upcoming (in 2 hours) ⏳</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
