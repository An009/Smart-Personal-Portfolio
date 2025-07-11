import { useState } from "react";
import { Message } from "../types/chat.ts";
import { supabase } from "../lib/supabase.ts";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! Azul I'm your AI assistant. How can I help you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    try {
      setIsLoading(true);

      // Add user message optimistically
      const userMessage: Message = { role: "user", content };
      setMessages((prev) => [...prev, userMessage]);

      // Send to Supabase Edge Function
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { message: content },
      });

      let botResponse =
        "I apologize, but I'm having trouble connecting to the server. Please try again later.";

      if (error) {
        console.error("Supabase Function Error:", error);
      } else if (data && typeof data.response === "string") {
        botResponse = data.response;
      } else {
        console.error("Unexpected response format:", data);
      }

      // Add AI response
      const botMessage: Message = {
        role: "assistant",
        content: botResponse,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I'm having trouble connecting to the server. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isLoading };
}
