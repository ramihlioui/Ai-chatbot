import { motion, AnimatePresence } from 'framer-motion';
import { ChatInput } from './ChatInput';
import { FiMessageSquare, FiX } from 'react-icons/fi';
import type { ChatMessage as typeChat } from './types';
import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';

interface ChatWindowProps {
  messages: typeChat[];
  isOpen: boolean;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onPause: () => void;
  isLoading: boolean;
  onClose: () => void;
}

export const ChatWindow = ({
  messages,
  isOpen,
  inputValue,
  onInputChange,
  onSend,
  onPause,
  isLoading,
  onClose,
}: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-24 right-6 w-[400px] h-[600px] bg-background border rounded-xl shadow-xl flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className="bg-primary/5 border-b p-4 flex justify-between items-center">
            <h2 className="font-semibold flex items-center gap-2">
              <FiMessageSquare className="text-primary" />
              Chat Assistant
            </h2>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-background to-muted/5">
            <ul className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </ul>
          </div>

          {/* Input */}
          <div className="border-t p-3 bg-background">
            <ChatInput
              value={inputValue}
              onChange={onInputChange}
              onSend={onSend}
              onPause={onPause} isTyping={false}            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};