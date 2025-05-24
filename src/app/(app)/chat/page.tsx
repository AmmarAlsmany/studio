import { ChatInterface } from "@/components/chat/chat-interface";
import { MessageCircleHeart } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircleHeart className="h-7 w-7 text-primary" />
        <h1 className="text-3xl font-semibold tracking-tight">AI Chat Support</h1>
      </div>
      <p className="text-muted-foreground mb-6">
        Talk about anything on your mind. I&apos;m here to listen and offer support. This is a safe space.
      </p>
      <ChatInterface />
    </div>
  );
}
