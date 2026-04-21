import { beforeEach, describe, expect, it, vi } from 'vitest';

import { apiClient } from '../api/client';
import { generateRecipe } from './CoffeeService';

vi.mock('../api/client', () => ({
  apiClient: {
    post: vi.fn(),
  },
}));

const mockPost = vi.mocked(apiClient.post);

describe('generateRecipe', () => {
  beforeEach(() => {
    mockPost.mockReset();
  });

  it('normalizes a multiline string recipe into steps', async () => {
    mockPost.mockResolvedValue({
      data: { recipe: 'Bloom 40g water\nStir gently\nDraw down by 2:30' },
    });
    await expect(generateRecipe('V60')).resolves.toEqual({
      steps: ['Bloom 40g water', 'Stir gently', 'Draw down by 2:30'],
    });
  });

  it('accepts structured steps from the API', async () => {
    mockPost.mockResolvedValue({
      data: {
        recipe: { title: 'Espresso', steps: ['Dose 18g', 'Pull 28s'] },
      },
    });
    await expect(generateRecipe('Espresso')).resolves.toEqual({
      title: 'Espresso',
      steps: ['Dose 18g', 'Pull 28s'],
    });
  });
});
