import { useState } from "react";

import { useAiTutor } from "../../hooks/UseAiTutor";

export const TutorChat = () => {
  const [question, setQuestion] = useState("");
  const { messages, ask, clear, loading, error } = useAiTutor();

  const submit = async () => {
    await ask(question);
    setQuestion("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 640 }}>
      <div
        role="log"
        aria-live="polite"
        style={{
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: 12,
          minHeight: 200,
          maxHeight: 360,
          overflowY: "auto",
          background: "#fff",
        }}
      >
        {messages.length === 0 && <p style={{ margin: 0, color: "#666" }}>Ask anything about prompts or your coffee app.</p>}
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {messages.map((m) => (
            <li key={m.id} style={{ textAlign: m.role === "user" ? "right" : "left" }}>
              <span style={{ fontSize: 12, color: "#666" }}>{m.role === "user" ? "You" : "Tutor"}</span>
              <div
                style={{
                  display: "inline-block",
                  marginTop: 4,
                  padding: "8px 12px",
                  borderRadius: 8,
                  background: m.role === "user" ? "#d9ecff" : "#eee",
                  maxWidth: "85%",
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.content}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {error && (
        <p role="alert" style={{ color: "#a00", margin: 0 }}>
          {error}
        </p>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          aria-label="Your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void submit();
            }
          }}
          disabled={loading}
          style={{ flex: "1 1 200px", minWidth: 0, padding: 8 }}
        />
        <button type="button" onClick={() => void submit()} disabled={loading || !question.trim()}>
          {loading ? "Asking…" : "Ask"}
        </button>
        <button type="button" onClick={clear} disabled={messages.length === 0 && !error}>
          Clear chat
        </button>
      </div>
    </div>
  );
};
