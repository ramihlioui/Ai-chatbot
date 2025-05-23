import { motion } from 'framer-motion';
import { FiSend, FiStopCircle, FiArrowUpCircle } from 'react-icons/fi';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onPause: () => void;
  isTyping: boolean;  // Changed from isLoading
  isSending?: boolean; // If you need separate sending state
}

export const ChatInput = ({
  value,
  onChange,
  onSend,
  onPause,
  isTyping,
  isSending = false,
}: ChatInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isTyping) onSend(); // Only send if not currently typing
    }
  };

  return (
    <div className="flex gap-2 items-end">
      <motion.textarea
        className="flex-1 min-h-[44px] max-h-[120px] border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none bg-background"
        placeholder="Type a message..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        disabled={isTyping || isSending}
      />
      <motion.button
        className="h-11 w-11 rounded-full flex items-center justify-center disabled:opacity-50"
        style={{
          backgroundColor: '#00a152',
          color: '#fff',
          border: 'none',
        }}
        onClick={isTyping ? onPause : onSend}
        disabled={(!value.trim() && !isTyping) || isSending}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isTyping ? (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <FiStopCircle size={18} />
          </motion.div>
        ) : (
          <FiArrowUpCircle size={22} />
        )}
      </motion.button>
    </div>
  );
};