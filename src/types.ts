export type MessageDirection = "incoming" | "outgoing";

export interface ChatMessage {
  id: string;
  direction: MessageDirection;
  content: string;
  isLoading?: boolean;
  isPaused?: boolean;
  isError?: boolean;
  timestamp?: Date;
}

export interface ApiResponse {
  response: string;
}

export interface ChatbotConfig {
  apiUrl: string;
  typingSpeed?: number;
  welcomeMessage?: string;
  primaryColor?: string;
}

export const defaultConfig: ChatbotConfig = {
  apiUrl: "http://localhost:8000/ask",
  typingSpeed: 30,
  welcomeMessage: "Hello! How can I help you today?",
  primaryColor: "#3b82f6",
};
export const generateId = (): string => crypto.randomUUID();
