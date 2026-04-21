import { apiClient } from "../api/client";

export type NormalizedRecipe = {
  title?: string;
  steps: string[];
};

function normalizeRecipe(raw: unknown): NormalizedRecipe {
  if (raw == null) {
    return { steps: [] };
  }
  if (typeof raw === "string") {
    return {
      steps: raw
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean),
    };
  }
  if (typeof raw === "object" && raw !== null && "steps" in raw) {
    const o = raw as { title?: string; steps: unknown };
    if (Array.isArray(o.steps)) {
      return {
        title: typeof o.title === "string" ? o.title : undefined,
        steps: o.steps.filter((s): s is string => typeof s === "string" && s.trim().length > 0),
      };
    }
  }
  return { steps: [String(raw)] };
}

export async function generateRecipe(coffee: string): Promise<NormalizedRecipe> {
  const res = await apiClient.post<{ recipe: unknown }>("/coffee/recipe", { coffee });
  return normalizeRecipe(res.data.recipe);
}
