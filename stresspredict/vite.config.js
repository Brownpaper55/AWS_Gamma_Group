import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Local dev only: forwards /api/* to the Python backend, like CloudFront does in production.
  server: { proxy: { "/api": "http://localhost:8000" } },
});
