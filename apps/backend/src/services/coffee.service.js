import { askAi } from "./ai.service.js";

export const generateRecipe = async (coffeeType) =>
  askAi(`
You are a professional barista.

Explain step-by-step how to make ${coffeeType}.
`);