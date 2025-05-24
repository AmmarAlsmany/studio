
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MoodSelector } from "@/components/tracker/mood-selector";
import type { MoodScale, SleepQuality, AppetiteLevel, ActivityLevel, SocialEngagementLevel, SymptomEntry } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Edit3 } from "lucide-react";
import React from "react";

import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const symptomSchema = z.object({
  mood: z.custom<MoodScale>((val) => typeof val === 'number' && val >= 1 && val <= 5, {
    message: "Please select your mood.",
  }),
  sleepHours: z.coerce.number().min(0, "Sleep hours cannot be negative.").max(24, "Sleep hours cannot exceed 24.").optional().or(z.literal('')),
  sleepQuality: z.custom<SleepQuality>().optional(),
  appetite: z.custom<AppetiteLevel>((val) => ["decreased", "normal", "increased"].includes(val as string), {
    message: "Please select your appetite level.",
  }),
  activity: z.custom<ActivityLevel>((val) => ["low", "normal", "high"].includes(val as string), {
    message: "Please select your activity level.",
  }),
  socialEngagement: z.custom<SocialEngagementLevel>((val) => ["none", "a_little", "moderate", "a_lot"].includes(val as string), {
    message: "Please select your social engagement level.",
  }),
  journal: z.string().max(1000, "Journal entry cannot exceed 1000 characters.").optional(),
});

type SymptomFormValues = z.infer<typeof symptomSchema>;

export default function TrackerPage() {
  const { toast } = useToast();
  const form = useForm<SymptomFormValues>({
    resolver: zodResolver(symptomSchema),
    defaultValues: {
      sleepHours: undefined,
      journal: "",
      appetite: undefined,
      activity: undefined,
      socialEngagement: undefined,
    },
  });

  const onSubmit = async (data: SymptomFormValues) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "You must be logged in to save an entry. Please log in and try again.",
      });
      form.reset(data); // Keep form data if submission fails due to auth
      return;
    }

    const entryToSubmit: SymptomEntry = {
      id: new Date().toISOString(), // This will be used as the document ID
      date: new Date(),
      userId: currentUser.uid, // Associate entry with the logged-in user
      mood: data.mood,
      sleepHours: data.sleepHours ? Number(data.sleepHours) : undefined,
      sleepQuality: data.sleepQuality,
      appetite: data.appetite!,
      activity: data.activity!,
      socialEngagement: data.socialEngagement!,
      journal: data.journal,
    };

    try {
      // Define the path in Firestore: users/{userId}/symptomEntries/{entryId}
      const entryRef = doc(db, "users", currentUser.uid, "symptomEntries", entryToSubmit.id);
      await setDoc(entryRef, entryToSubmit);

      toast({
        title: "Entry Saved! ✨",
        description: "Your daily check-in has been recorded in Firestore.",
      });
      form.reset({
        mood: undefined,
        sleepHours: undefined,
        sleepQuality: undefined,
        appetite: undefined,
        activity: undefined,
        socialEngagement: undefined,
        journal: ""
      });
    } catch (error) {
      console.error("Error saving symptom entry to Firestore:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error instanceof Error ? error.message : "Could not save your entry to Firestore. Please try again.",
      });
    }
  };
  
  const [currentDate, setCurrentDate] = React.useState('');
  React.useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);


  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Edit3 className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Daily Check-in</CardTitle>
        </div>
        {currentDate && <CardDescription>How are you feeling today, {currentDate}?</CardDescription>}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="mood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">My Mood</FormLabel>
                  <FormControl>
                    <MoodSelector value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="sleepHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sleep Hours (Optional)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.5" placeholder="e.g., 8" {...field} onChange={event => field.onChange(+event.target.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sleepQuality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sleep Quality (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select quality" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="poor">Poor 😩</SelectItem>
                        <SelectItem value="fair">Fair 😕</SelectItem>
                        <SelectItem value="good">Good 😊</SelectItem>
                        <SelectItem value="excellent">Excellent 😄</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="appetite"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-lg font-semibold">Appetite</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl><RadioGroupItem value="decreased" /></FormControl>
                        <Label className="font-normal">Decreased 📉</Label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl><RadioGroupItem value="normal" /></FormControl>
                        <Label className="font-normal">Normal 😋</Label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl><RadioGroupItem value="increased" /></FormControl>
                        <Label className="font-normal">Increased 📈</Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="activity"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-lg font-semibold">Activity Level</FormLabel>
                  <FormControl>
                     <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl><RadioGroupItem value="low" /></FormControl>
                        <Label className="font-normal">Low 🚶‍♀️</Label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl><RadioGroupItem value="normal" /></FormControl>
                        <Label className="font-normal">Normal 💪</Label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl><RadioGroupItem value="high" /></FormControl>
                        <Label className="font-normal">High 🤸</Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="socialEngagement"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-lg font-semibold">Social Engagement</FormLabel>
                  <FormControl>
                     <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl><RadioGroupItem value="none" /></FormControl>
                        <Label className="font-normal">None 👤</Label>
                      </FormItem>
                       <FormItem className="flex items-center space-x-2">
                        <FormControl><RadioGroupItem value="a_little" /></FormControl>
                        <Label className="font-normal">A Little 👋</Label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl><RadioGroupItem value="moderate" /></FormControl>
                        <Label className="font-normal">Moderate 💬</Label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl><RadioGroupItem value="a_lot" /></FormControl>
                        <Label className="font-normal">A Lot 🎉</Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="journal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Notes / Journal (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your day, how you felt, or anything on your mind..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Max 1000 characters.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save Entry"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}


    