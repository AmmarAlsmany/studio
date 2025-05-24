"use client";

import React, { useState, useRef, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, User, Bot } from "lucide-react";
import { aiChatSupport, type AIChatSupportInput, type AIChatSupportOutput } from "@/ai/flows/ai-chat-support";
import type { ChatMessage } from "@/types";
import { cn } from "@/lib/utils";

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [initialMessageDisplayed, setInitialMessageDisplayed] = useState(false);

  // Effect to set initial message and ensure it's only done once
  useEffect(() => {
    if (!initialMessageDisplayed) {
      setMessages([
        {
          id: "initial-" + Date.now(),
          role: "assistant",
          content: "Hi there! I'm here to listen and support you. How are you feeling today? 😊",
          timestamp: new Date(),
        },
      ]);
      setInitialMessageDisplayed(true);
    }
  }, [initialMessageDisplayed]);


  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
       const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
      }
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const chatHistoryForAI = messages.map(msg => ({ role: msg.role as 'user' | 'assistant', content: msg.content }));
      
      const aiInput: AIChatSupportInput = {
        message: userMessage.content,
        chatHistory: chatHistoryForAI,
      };
      const aiOutput: AIChatSupportOutput = await aiChatSupport(aiInput);

      const assistantMessage: ChatMessage = {
        id: Date.now().toString() + "-ai",
        role: "assistant",
        content: aiOutput.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString() + "-err",
        role: "assistant",
        content: "I'm having a little trouble connecting right now. Please try again in a moment. 🙏",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] bg-card rounded-lg shadow-lg overflow-hidden border">
      <ScrollArea className="flex-1 p-4 md:p-6" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-end gap-3",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot size={18} />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-[70%] rounded-xl px-4 py-3 text-sm shadow", // Adjusted shadow for subtlety
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted text-card-foreground rounded-bl-none" // Use card-foreground for better contrast on muted
                )}
              >
                <p style={{ whiteSpace: 'pre-wrap' }}>{message.content}</p>
                <p className={cn(
                    "text-xs mt-1",
                    message.role === "user" ? "text-primary-foreground/70 text-right" : "text-card-foreground/70 text-left"
                )}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    <User size={18} />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-end gap-3 justify-start">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot size={18} />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-[70%] rounded-xl px-4 py-3 text-sm shadow bg-muted text-card-foreground rounded-bl-none">
                    <p>Thinking... 🤔</p>
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t p-3 md:p-4 bg-background"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
          disabled={isLoading}
          aria-label="Chat message input"
        />
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()} aria-label="Send message">
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
