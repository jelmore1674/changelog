import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["./src/**/*.test.ts"],
    exclude: ["dist"],
    retry: 1,
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["src"],
      exclude: ["dist"],
    },
  },
  resolve: {
    alias: {
      "@/parser": path.resolve(__dirname, "src/parser"),
      "@/types": path.resolve(__dirname, "src/types/index.ts"),
      "@/regex": path.resolve(__dirname, "src/regex/index.ts"),
      "@/write": path.resolve(__dirname, "./src/write"),
    },
  },
});
