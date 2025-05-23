import { motion } from 'framer-motion';
import { FiMessageSquare, FiX } from 'react-icons/fi';

interface ChatToggleProps {
  isOpen: boolean;
  toggle: () => void;
}

export const ChatToggle = ({ isOpen, toggle }: ChatToggleProps) => {
  return (
    <motion.button
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg flex items-center justify-center"
      style={{
        backgroundColor: '#00a152',
        color: '#fff',
        border: 'none'
      }}
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        className="absolute"
        animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <FiMessageSquare size={24} />
      </motion.div>
      <motion.div
        className="absolute"
        animate={{ rotate: isOpen ? 0 : -90, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <FiX size={24} />
      </motion.div>
    </motion.button>
  );
};