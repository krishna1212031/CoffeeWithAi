import { useMemo, useState } from "react";

import type { NormalizedRecipe } from "../../services/CoffeeService";
import { generateRecipe } from "../../services/CoffeeService";

function recipeToText(recipe: NormalizedRecipe): string {
  const lines: string[] = [];
  if (recipe.title) {
    lines.push(recipe.title);
    lines.push("");
  }
  recipe.steps.forEach((s, i) => lines.push(`${i + 1}. ${s}`));
  return lines.join("\n");
}

export const RecipeGenerator = () => {
  const [coffee, setCoffee] = useState("");
  const [recipe, setRecipe] = useState<NormalizedRecipe | null>(null);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [copyHint, setCopyHint] = useState<string | null>(null);

  const generate = async () => {
    setCopyHint(null);
    const res = await generateRecipe(coffee);
    setRecipe(res);
    setChecked({});
  };

  const text = useMemo(() => (recipe ? recipeToText(recipe) : ""), [recipe]);

  const copy = async () => {
    if (!text) {
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopyHint("Copied to clipboard");
    } catch {
      setCopyHint("Copy failed — select text manually");
    }
    setTimeout(() => setCopyHint(null), 2500);
  };

  const toggleStep = (index: number) => {
    setChecked((c) => ({ ...c, [index]: !c[index] }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 560 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <input
          aria-label="Coffee style or beans"
          value={coffee}
          onChange={(e) => setCoffee(e.target.value)}
          placeholder="e.g. Ethiopian pour-over"
          style={{ flex: "1 1 200px", padding: 8 }}
        />
        <button type="button" onClick={() => void generate()}>
          Generate
        </button>
        <button type="button" onClick={() => void copy()} disabled={!text}>
          Copy recipe
        </button>
      </div>
      {copyHint && <p style={{ margin: 0, fontSize: 14 }}>{copyHint}</p>}

      {recipe && (
        <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 8, padding: 16 }}>
          {recipe.title && <h2 style={{ marginTop: 0 }}>{recipe.title}</h2>}
          {recipe.steps.length === 0 ? (
            <p>No steps returned — try another description.</p>
          ) : (
            <ol style={{ margin: 0, paddingLeft: 20 }}>
              {recipe.steps.map((step, i) => (
                <li key={i} style={{ marginBottom: 8 }}>
                  <label style={{ cursor: "pointer", display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <input type="checkbox" checked={Boolean(checked[i])} onChange={() => toggleStep(i)} />
                    <span style={{ textDecoration: checked[i] ? "line-through" : undefined, opacity: checked[i] ? 0.7 : 1 }}>
                      {step}
                    </span>
                  </label>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
};
