import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Youtube, FileText } from "lucide-react";
import type { EducationalResource } from "@/types";

interface ResourceCardProps {
  resource: EducationalResource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const Icon = resource.type === "video" ? Youtube : resource.type === "article" ? FileText : ExternalLink;
  
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0"> {/* Remove padding for full-width image */}
        {resource.thumbnailUrl && (
          <div className="relative aspect-video rounded-t-md overflow-hidden">
            <Image
              src={resource.thumbnailUrl}
              alt={resource.title}
              fill // Changed from layout="fill"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Added sizes for responsive images
              style={{ objectFit: "cover" }} // Changed from objectFit="cover"
              data-ai-hint={resource.aiHint || "wellness education"}
            />
          </div>
        )}
         <div className="p-6"> {/* Add padding back for title and description */}
          <CardTitle className="text-xl flex items-center gap-2 mb-2">
            <Icon className="h-5 w-5 text-primary shrink-0" />
            {resource.title}
          </CardTitle>
          <CardDescription className="flex-grow min-h-[3em] text-sm">{resource.description}</CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="mt-auto p-6 pt-0"> {/* Ensure footer padding */}
        <Button asChild variant="outline" className="w-full">
          <Link href={resource.url} target="_blank" rel="noopener noreferrer">
            Learn More <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
