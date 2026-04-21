import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const GROQ_API_KEY = process.env.GROQ_API_KEY;
/** e.g. redis://localhost:6379 — if unset, AI response caching is skipped */
export const REDIS_URL = process.env.REDIS_URL;

export const config = {
  PORT,
  OPENAI_API_KEY,
  GROQ_API_KEY,
  REDIS_URL
};