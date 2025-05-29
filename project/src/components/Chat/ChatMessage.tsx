import React from "react";
import { Message } from "../../types/chat.ts";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === "assistant";

  return (
    <div
      className={`flex items-start gap-2 ${
        isBot ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <div
        className={`p-2 rounded-full ${
          isBot ? "bg-blue-500" : "bg-purple-500"
        }`}
      >
        {isBot ? (
          <Bot className="w-5 h-5 text-white" />
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </div>
      <div
        className={`max-w-[80%] p-3 rounded-lg overflow-x-auto text-white ${
          isBot ? "bg-gray-700" : "bg-blue-500"
        }`}
      >
        <ReactMarkdown
          components={{
            a: ({ node: _node, ...props }) => (
              <a
                {...props}
                className="text-blue-300 underline break-all"
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
            p: ({ node: _node, ...props }) => (
              <p {...props} className="mb-2 last:mb-0" />
            ),
            ul: ({ node: _node, ...props }) => (
              <ul {...props} className="list-disc ml-6 mb-2" />
            ),
            ol: ({ node: _node, ...props }) => (
              <ol {...props} className="list-decimal ml-6 mb-2" />
            ),
            li: ({ node: _node, ...props }) => (
              <li {...props} className="mb-1" />
            ),
            blockquote: ({ node: _node, ...props }) => (
              <blockquote
                {...props}
                className="border-l-4 border-blue-400 pl-4 italic text-blue-200 my-2"
              />
            ),
            code: ({ node: _node, ...props }) => {
              // @ts-expect-error: 'inline' is not in the type but is provided by react-markdown
              const { inline } = props;
              if (inline) {
                return (
                  <code
                    className="bg-gray-900 rounded px-1 py-0.5 text-pink-400"
                    {...props}
                  />
                );
              } else {
                return (
                  <pre className="bg-black rounded p-3 overflow-x-auto my-2 text-sm">
                    <code {...props} />
                  </pre>
                );
              }
            },
            h1: ({ node: _node, ...props }) => (
              <h1 {...props} className="text-2xl font-bold mt-4 mb-2" />
            ),
            h2: ({ node: _node, ...props }) => (
              <h2 {...props} className="text-xl font-bold mt-3 mb-2" />
            ),
            h3: ({ node: _node, ...props }) => (
              <h3 {...props} className="text-lg font-bold mt-3 mb-2" />
            ),
            h4: ({ node: _node, ...props }) => (
              <h4 {...props} className="text-base font-bold mt-3 mb-2" />
            ),
            h5: ({ node: _node, ...props }) => (
              <h5 {...props} className="text-sm font-bold mt-3 mb-2" />
            ),
            h6: ({ node: _node, ...props }) => (
              <h6 {...props} className="text-xs font-bold mt-3 mb-2" />
            ),
            table: ({ node: _node, ...props }) => (
              <table
                {...props}
                className="w-full my-2 border-collapse border border-gray-700"
              />
            ),
            thead: ({ node: _node, ...props }) => (
              <thead {...props} className="bg-gray-800" />
            ),
            tbody: ({ node: _node, ...props }) => <tbody {...props} />,
            tr: ({ node: _node, ...props }) => (
              <tr {...props} className="border-t border-gray-700" />
            ),
            th: ({ node: _node, ...props }) => (
              <th {...props} className="px-4 py-2 text-left font-semibold" />
            ),
            td: ({ node: _node, ...props }) => (
              <td {...props} className="px-4 py-2" />
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
