import { useCallback, useState } from "react";

import { askTutor } from "../services/AiService";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function nextId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const useAiTutor = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ask = useCallback(async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) {
      return;
    }
    setError(null);
    setMessages((m) => [...m, { id: nextId(), role: "user", content: trimmed }]);
    setLoading(true);
    try {
      const answer = await askTutor(trimmed);
      setMessages((m) => [...m, { id: nextId(), role: "assistant", content: answer }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, ask, clear, loading, error };
};
