import { motion } from 'framer-motion';
import { FiMessageSquare, FiUser, FiAlertTriangle, FiPause } from 'react-icons/fi';

interface ChatMessageProps {
  message: {
    id: string;
    direction: 'incoming' | 'outgoing';
    content: string;
    isLoading?: boolean;
    isPaused?: boolean;
    isError?: boolean;
  };
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const Icon = message.direction === 'incoming' ? FiMessageSquare : FiUser;

  return (
    <motion.li
      className={`flex gap-3 ${message.direction === 'outgoing' ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {message.direction === 'incoming' && (
        <div className="flex-shrink-0 mt-1">
          <div className={`p-2 rounded-full ${
            message.isError 
              ? 'bg-red-100 text-red-500' 
              : message.isPaused
                ? 'bg-yellow-100 text-yellow-500'
                : 'bg-primary/10 text-primary'
          }`}>
            {message.isError ? (
              <FiAlertTriangle size={18} />
            ) : message.isPaused ? (
              <FiPause size={18} />
            ) : (
              <Icon size={18} />
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col max-w-[85%]">
        {message.isLoading ? (
          <div className="flex gap-1 p-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100" />
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200" />
          </div>
        ) : (
          <motion.div
            className={`rounded-xl px-4 py-3 ${
              message.direction === 'outgoing'
                ? 'bg-[#00a15244] text-primary rounded-br-none' // a bit darker green bubble
                : message.isError
                  ? 'bg-red-100 text-red-800 rounded-bl-none'
                  : message.isPaused
                    ? 'bg-yellow-100 text-yellow-800 rounded-bl-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
          >
            {message.content}
            {message.isPaused && (
              <div className="text-xs italic mt-1">Response paused</div>
            )}
          </motion.div>
        )}
      </div>
    </motion.li>
  );
};