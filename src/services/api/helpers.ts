// api/helpers.ts

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getAvatarUrl = (seed: string) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
