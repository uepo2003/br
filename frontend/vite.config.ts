import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";

const env = process.env.NODE_ENV || "development";
const frontendPort = process.env.FRONTEND_PORT || 5173;
const backendPort = process.env.BACKEND_PORT || 4444;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: env !== "test" ? 3000 : frontendPort,
    proxy: {
      "/api": `http://localhost:${env !== "test" ? 8000 : backendPort}`,
      "/image": `http://localhost:${env !== "test" ? 8000 : backendPort}`,
    },
  },
});
