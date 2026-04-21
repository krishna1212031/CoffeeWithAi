import { useState } from "react";

export const CodeEditor = () => {
  const [prompt, setPrompt] = useState("");

  return (
    <div>

      <textarea
        rows={10}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

    </div>
  );
};