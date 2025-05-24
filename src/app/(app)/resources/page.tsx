import { ResourceCard } from "@/components/resources/resource-card";
import type { EducationalResource } from "@/types";
import { BookHeart } from "lucide-react";

const resources: EducationalResource[] = [
  {
    id: "1",
    title: "Understanding Depression in Teens",
    description: "A short video explaining what depression is and how it can affect teenagers.",
    type: "video",
    url: "https://www.youtube.com/watch?v= depresion", // Replace with actual URL
    thumbnailUrl: "https://placehold.co/600x338.png",
    aiHint: "mental health video"
  },
  {
    id: "2",
    title: "Coping Strategies for Tough Days",
    description: "An article with practical tips for managing difficult emotions and situations.",
    type: "article",
    url: "https://www.example.com/article1", // Replace with actual URL
    thumbnailUrl: "https://placehold.co/600x338.png",
    aiHint: "wellness article"
  },
  {
    id: "3",
    title: "Mindfulness Exercises for Calm",
    description: "Guided mindfulness exercises to help you find moments of peace.",
    type: "video",
    url: "https://www.example.com/video2", // Replace with actual URL
    thumbnailUrl: "https://placehold.co/600x338.png",
    aiHint: "mindfulness exercise"
  },
  {
    id: "4",
    title: "The Importance of Reaching Out",
    description: "Learn why talking about your feelings is a sign of strength.",
    type: "article",
    url: "https://www.example.com/article2", // Replace with actual URL
    thumbnailUrl: "https://placehold.co/600x338.png",
    aiHint: "support help"
  },
   {
    id: "5",
    title: "Building Healthy Habits",
    description: "Explore how sleep, nutrition, and exercise impact mental well-being.",
    type: "video",
    url: "https://www.example.com/video3",
    thumbnailUrl: "https://placehold.co/600x338.png",
    aiHint: "healthy lifestyle"
  },
  {
    id: "6",
    title: "Understanding Your Thoughts",
    description: "An introduction to cognitive behavioral therapy (CBT) concepts for teens.",
    type: "article",
    url: "https://www.example.com/article3",
    thumbnailUrl: "https://placehold.co/600x338.png",
    aiHint: "cognitive therapy"
  },
];

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BookHeart className="h-7 w-7 text-primary" />
        <h1 className="text-3xl font-semibold tracking-tight">Educational Resources</h1>
      </div>
      <p className="text-muted-foreground">
        Explore these curated videos and articles to learn more about mental health and wellness.
      </p>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}
