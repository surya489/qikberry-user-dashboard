const getEnv = (key: keyof ImportMetaEnv, fallback: string): string => {
  const value = import.meta.env[key];
  return value?.trim() ? value.trim() : fallback;
};

export const env = {
  apiBaseUrl: getEnv("VITE_API_BASE_URL", "https://jsonplaceholder.typicode.com"),
  demoUsername: getEnv("VITE_DEMO_USERNAME", "admin"),
  demoPassword: getEnv("VITE_DEMO_PASSWORD", "admin123"),
} as const;
