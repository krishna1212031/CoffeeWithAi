import { generateRecipe } from "../services/coffee.service.js";

export const recipeController = async (req, res) => {
  const { coffeeType } = req.body;

  const recipe = await generateRecipe(coffeeType);

  res.json({ recipe });
};