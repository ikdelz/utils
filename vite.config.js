import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd());

  // Filter and stringify environment variables with the 'VITE_' prefix
  const envWithProcessPrefix = Object.entries(env).reduce((acc, [key, val]) => {
    if (key.startsWith("VITE_")) {
      acc[`process.env.${key}`] = JSON.stringify(val);
    }
    return acc;
  }, {});

  return {
    plugins: [react()],
    define: {
      // Use the stringified environment variables
      ...envWithProcessPrefix,
    },
  };
});
