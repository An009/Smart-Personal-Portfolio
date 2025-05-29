import React from "react";
import { useState } from "react";
import { Bot, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatWindow } from "./ChatWindow.tsx";
import { ChatInput } from "./ChatInput.tsx";
import { useChat } from "../../hooks/useChat.ts";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, sendMessage, isLoading } = useChat();

  const handleSend = async (message: string) => {
    if (message.trim()) {
      await sendMessage(message);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors hover:animate-none"
        aria-label="Open chat"
      >
        <Bot className="w-6 h-6 animate-wave-light" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 w-[95vw] max-w-2xl h-[80vh] bg-gray-800 bg-opacity-20 backdrop-blur-md rounded-lg shadow-xl flex flex-col z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold">Chat with AI Assistant</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Window Content */}
            <ChatWindow messages={messages} />

            {/* Chat Input */}
            <ChatInput onSend={handleSend} isLoading={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
