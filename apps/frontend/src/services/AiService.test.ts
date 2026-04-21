import { apiClient } from "../api/client";
import { askTutor } from "./AiService";

jest.mock("../api/client", () => ({
  apiClient: {
    post: jest.fn(),
  },
}));

const mockPost = apiClient.post as jest.MockedFunction<typeof apiClient.post>;

describe("askTutor", () => {
  beforeEach(() => {
    mockPost.mockReset();
  });

  it("returns the answer from the API", async () => {
    mockPost.mockResolvedValue({ data: { answer: "Use clear constraints." } });
    await expect(askTutor("How do I prompt?")).resolves.toBe("Use clear constraints.");
    expect(mockPost).toHaveBeenCalledWith("/ai/tutor", { question: "How do I prompt?" });
  });
});
