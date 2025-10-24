import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/TeamFlow/", // 👈 важливо для GitHub Pages
});
