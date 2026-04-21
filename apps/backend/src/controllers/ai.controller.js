import { askAi } from "../services/ai.service.js";

export const tutorController = async (req, res) => {
  const { question } = req.body;

  const answer = await askAi(
    `
You are an AI tutor teaching AI using a coffee app.

Question: ${question}
`
  );

  res.json({ answer });
};