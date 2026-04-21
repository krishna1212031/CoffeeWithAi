import { getLessons } from "../services/lesson.service.js";

export const lessonController = (req, res) => {
  res.json(getLessons());
};