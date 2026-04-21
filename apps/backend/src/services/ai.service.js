import OpenAI from "openai";
import { ChatGroq } from "@langchain/groq";
import { createClient } from "redis";
import crypto from "crypto";
import {
  OPENAI_API_KEY,
  GROQ_API_KEY,
  REDIS_URL,
} from "../config/env.js";

const GROQ_MODEL = "llama-3.3-70b-versatile";
const OPENAI_MODEL = "gpt-4.1-mini";

const COFFEE_SYSTEM_PROMPT =
  "You are CoffeeWithAI, a helpful coffee expert.";

const CACHE_VERSION = 1;

/** TTL for cached LLM strings (Redis EX is in whole seconds). */
const CACHE_TTL_MS = 1000 * 60 * 5;
const CACHE_TTL_SEC = Math.ceil(CACHE_TTL_MS / 1000);

/**
 * Prefix so this app does not collide with other keys on a shared Redis instance.
 */
const CACHE_KEY_PREFIX = "coffee-with-ai:ai:";

const groqClient = new ChatGroq({
  apiKey: GROQ_API_KEY,
  model: GROQ_MODEL,
});

const openaiClient = OPENAI_API_KEY
  ? new OpenAI({ apiKey: OPENAI_API_KEY })
  : null;

/**
 * Single shared client; lazily connected on first cache use.
 * If REDIS_URL is unset or connect fails, caching is disabled (always miss / no-op set).
 */
let redisClientPromise = null;

function getRedisClientPromise() {
  if (!REDIS_URL) return null;
  if (!redisClientPromise) {
    const client = createClient({ url: REDIS_URL });
    client.on("error", (err) => {
      console.error("[ai] redis client error:", err.message);
    });
    redisClientPromise = client
      .connect()
      .then(() => client)
      .catch((err) => {
        console.error("[ai] redis unavailable, caching disabled:", err.message);
        redisClientPromise = Promise.resolve(null);
        return null;
      });
  }
  return redisClientPromise;
}

const generateCacheKey = ({ prompt, route, cacheScope }) => {
  const payload = {
    v: CACHE_VERSION,
    prompt,
    groqModel: GROQ_MODEL,
    openaiModel: OPENAI_MODEL,
    route,
    scope: cacheScope ?? "global",
  };
  if (route === "groq") {
    payload.system = COFFEE_SYSTEM_PROMPT;
  }
  return crypto.createHash("sha256").update(JSON.stringify(payload)).digest("hex");
};

const redisKey = (hash) => `${CACHE_KEY_PREFIX}${hash}`;

const getFromCache = async (key) => {
  const p = getRedisClientPromise();
  if (!p) return null;
  const client = await p;
  if (!client) return null;
  try {
    return await client.get(redisKey(key));
  } catch (err) {
    console.warn("[ai] redis get failed:", err?.message ?? err);
    return null;
  }
};

const setCache = async (key, value) => {
  const p = getRedisClientPromise();
  if (!p) return;
  const client = await p;
  if (!client) return;
  try {
    await client.set(redisKey(key), value, { EX: CACHE_TTL_SEC });
  } catch (err) {
    console.warn("[ai] redis set failed:", err?.message ?? err);
  }
};

function groqOutputText(content) {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((p) => (typeof p === "string" ? p : p?.text ?? ""))
      .join("");
  }
  return String(content ?? "");
}

const isComplexQuery = (prompt) => {
  return (
    prompt.length > 200 ||
    /analyze|compare|why|architecture|design/i.test(prompt)
  );
};

export const askOpenAi = async (prompt) => {
  if (!openaiClient) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const res = await openaiClient.responses.create({
    model: OPENAI_MODEL,
    input: prompt,
  });

  return res.output_text;
};

export const askAi = async (prompt, options = {}) => {
  const { cacheScope } = options;
  const complex = isComplexQuery(prompt);
  const route = complex ? "openai" : "groq";

  const cacheKey = generateCacheKey({ prompt, route, cacheScope });

  const cached = await getFromCache(cacheKey);
  if (cached) {
    console.log("[ai] cache hit");
    return cached;
  }

  let response;
  let usedGroq = false;

  try {
    if (complex) {
      console.log("[ai] route=openai (complex query)");
      response = await askOpenAi(prompt);
    } else {
      console.log("[ai] route=groq");
      usedGroq = true;

      const res = await groqClient.invoke([
        {
          role: "system",
          content: COFFEE_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: prompt,
        },
      ]);

      response = groqOutputText(res.content);
    }
  } catch (err) {
    if (!usedGroq) throw err;
    if (!openaiClient) throw err;
    console.warn("[ai] groq failed, falling back to openai:", err?.message);
    response = await askOpenAi(prompt);
  }

  await setCache(cacheKey, response);

  return response;
};
