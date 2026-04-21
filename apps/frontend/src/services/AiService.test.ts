import { beforeEach, describe, expect, it, vi } from 'vitest';

import { apiClient } from '../api/client';
import { askTutor } from './AiService';

vi.mock('../api/client', () => ({
  apiClient: {
    post: vi.fn(),
  },
}));

const mockPost = vi.mocked(apiClient.post);

describe('askTutor', () => {
  beforeEach(() => {
    mockPost.mockReset();
  });

  it('returns the answer from the API', async () => {
    mockPost.mockResolvedValue({ data: { answer: 'Use clear constraints.' } });
    await expect(askTutor('How do I prompt?')).resolves.toBe('Use clear constraints.');
    expect(mockPost).toHaveBeenCalledWith('/ai/tutor', { question: 'How do I prompt?' });
  });
});
