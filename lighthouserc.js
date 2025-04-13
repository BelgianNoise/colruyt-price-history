export const ci = {
  collect: {
    url: ['https://colruyt-prijzen.nasaj.be/'],
  },
  upload: {
    target: 'temporary-public-storage',
  },
  assert: {
    preset: 'lighthouse:recommended',
    assertions: {
      'categories:performance': ['error', { minScore: 0.9 }],
      'categories:accessibility': ['error', { minScore: 0.9 }],
      'categories:best-practices': ['error', { minScore: 0.9 }],
      'categories:seo': ['error', { minScore: 0.9 }],
    },
  },
};