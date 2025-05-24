import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface UserAvatarProps {
  name?: string | null;
  imageUrl?: string | null;
}

export function UserAvatar({ name, imageUrl }: UserAvatarProps) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <Avatar>
      {imageUrl ? <AvatarImage src={imageUrl} alt={name || "User avatar"} /> : null}
      <AvatarFallback>
        {imageUrl ? null : name ? initials : <User className="h-5 w-5" />}
      </AvatarFallback>
    </Avatar>
  );
}
