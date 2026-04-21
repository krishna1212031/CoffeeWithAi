import { FormEvent, useEffect, useState } from "react";

import { useUserStore } from "../../store/UseStore";

export const ProfilePage = () => {
  const { name, xp, setName, addXp } = useUserStore();
  const [draft, setDraft] = useState(name);

  useEffect(() => {
    setDraft(name);
  }, [name]);

  const save = (e: FormEvent) => {
    e.preventDefault();
    setName(draft);
  };

  return (
    <div style={{ maxWidth: 480 }}>
      <h1 style={{ marginTop: 0 }}>Profile</h1>

      <p>
        XP: <strong>{xp}</strong>
      </p>

      <form onSubmit={save} style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        <label htmlFor="display-name">Display name</label>
        <input id="display-name" value={draft} onChange={(e) => setDraft(e.target.value)} style={{ padding: 8 }} />
        <button type="submit">Save name</button>
      </form>

      <p style={{ fontSize: 14, color: "#555" }}>Signed in as: {name}</p>

      <button type="button" onClick={() => addXp(10)}>
        Earn 10 XP (demo)
      </button>
    </div>
  );
};
