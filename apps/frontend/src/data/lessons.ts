export type Lesson = {
  id: string;
  title: string;
  durationMin: number;
  tags: string[];
  body: string;
};

export const lessons: Lesson[] = [
  {
    id: "intro",
    title: "Welcome to prompt engineering",
    durationMin: 10,
    tags: ["basics", "overview"],
    body: "Prompt engineering is how you steer large language models toward useful, accurate answers. Clear goals, context, and constraints beat vague one-liners.",
  },
  {
    id: "prompting-101",
    title: "Structure: role, task, format",
    durationMin: 15,
    tags: ["patterns", "clarity"],
    body: "A solid pattern is: (1) role — who the model should act as; (2) task — what to produce; (3) format — bullets, JSON, steps, tone. Iterate with examples when results drift.",
  },
  {
    id: "coffee-domain",
    title: "Grounding prompts in your coffee app",
    durationMin: 12,
    tags: ["domain", "product"],
    body: "When generating recipes or tutor answers, inject domain context: brew method, bean style, user skill level. Ask the model to state assumptions and offer alternatives.",
  },
];

export function lessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function lessonIndex(id: string): number {
  return lessons.findIndex((l) => l.id === id);
}
