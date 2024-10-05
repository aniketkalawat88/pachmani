// lib/reactQuery.ts
import { QueryClient } from '@tanstack/react-query';

// Create a function to initialize the QueryClient
export const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Useful for SPA, might disable for SSR
    },
  },
});

