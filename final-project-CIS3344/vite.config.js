import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  test:{
    environment: "jsdom",
    coverage:{
      provider: "v8",
    },
  },
  // plugins: [react()],
});
