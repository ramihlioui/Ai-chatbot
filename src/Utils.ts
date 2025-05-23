
export const generateId = (): string => crypto.randomUUID();

export const scrollToBottom = (element: HTMLElement | null): void => {
  if (element) {
    element.scrollTop = element.scrollHeight;
  }
};

export const processMessageContent = (content: string): string => {
  return content;
};
