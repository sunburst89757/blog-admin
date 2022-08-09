import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default function config({ mode }) {
  return defineConfig({
    plugins: [react()],
    define: {
      "process.env.NODE_ENV": `"${mode}"`
    }
  });
}
