import { Message } from '../../types/chat';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'assistant';

  return (
    <div className={`flex items-start gap-2 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`p-2 rounded-full ${isBot ? 'bg-blue-500' : 'bg-purple-500'}`}>
        {isBot ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
      </div>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isBot ? 'bg-gray-700' : 'bg-blue-500'
        }`}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
}