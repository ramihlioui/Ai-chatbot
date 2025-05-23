import { useState, useEffect } from 'react';
import { ChatToggle } from './ChatToggle';
import { ChatWindow } from './ChatWindow';
import { generateId } from './Utils';
import { type ChatMessage, type ChatbotConfig, defaultConfig } from './types';

export const Chatbot = ({ config = defaultConfig }: { config?: ChatbotConfig }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateId(),
      direction: 'incoming',
      content: config.welcomeMessage || defaultConfig.welcomeMessage || '',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const typeText = async (messageId: string, text: string): Promise<void> => {
    let displayedText = '';
    for (let i = 0; i < text.length; i++) {
      if (abortController?.signal.aborted) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === messageId ? { ...msg, isPaused: true } : msg
          )
        );
        return;
      }

      displayedText = text.substring(0, i + 1);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId ? { ...msg, content: displayedText } : msg
        )
      );
      await new Promise(resolve =>
        setTimeout(
          resolve,
          1000 /
            ((config?.typingSpeed ??
              defaultConfig?.typingSpeed ??
              50) as number)
        )
      );
    }
  };

  const generateResponse = async (userMessage: string): Promise<void> => {
    const controller = new AbortController();
    setAbortController(controller);
    setIsLoading(true);

    try {
      const loadingMessageId = generateId();
      setMessages(prev => [
        ...prev,
        {
          id: loadingMessageId,
          direction: 'incoming',
          content: '',
          isLoading: true,
        },
      ]);

      const response = await fetch(config.apiUrl || defaultConfig.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userMessage }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      const responseText = data.response || "I couldn't process that request.";

      setMessages(prev =>
        prev.map(msg =>
          msg.id === loadingMessageId
            ? { ...msg, isLoading: false, content: '' }
            : msg
        )
      );

      await typeText(loadingMessageId, responseText);
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        setMessages(prev =>
          prev.map(msg =>
            msg.isLoading ? { ...msg, isPaused: true, isLoading: false } : msg
          )
        );
      } else {
        setMessages(prev => [
          ...prev.filter(msg => !msg.isLoading),
          {
            id: generateId(),
            direction: 'incoming',
            content: "Sorry, something went wrong.",
            isError: true,
          },
        ]);
      }
    } finally {
      setIsLoading(false);
      setAbortController(null);
    }
  };

  const handleSendMessage = () => {
    if (isLoading) return;

    const message = inputValue.trim();
    if (!message) return;

    setInputValue('');
    setMessages(prev => [
      ...prev,
      {
        id: generateId(),
        direction: 'outgoing',
        content: message,
      },
    ]);

    setTimeout(() => {
      generateResponse(message);
    }, 100);
  };

  const handlePause = () => {
    if (abortController) {
      abortController.abort();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <ChatToggle isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      <ChatWindow
        messages={messages}
        isOpen={isOpen}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSend={handleSendMessage}
        onPause={handlePause}
        isLoading={isLoading}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};