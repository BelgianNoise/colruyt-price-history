export const ci = {
  collect: {
    url: [
      'https://colruyt-prijzen.nasaj.be/',
      'https://colruyt-prijzen.nasaj.be/vv',
      'https://colruyt-prijzen.nasaj.be/pp',
      'https://colruyt-prijzen.nasaj.be/dd',
      'https://colruyt-prijzen.nasaj.be/ss',
      'https://colruyt-prijzen.nasaj.be/product/18574'
    ],
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