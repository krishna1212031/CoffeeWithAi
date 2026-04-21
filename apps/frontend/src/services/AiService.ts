import { apiClient } from "../api/client";

export async function askTutor(question: string): Promise<string> {
  const res = await apiClient.post<{ answer: string }>("/ai/tutor", { question });
  return res.data.answer;
}
