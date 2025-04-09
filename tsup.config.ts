import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "./src/parser/parseChangelog.ts",
    "./src/parser/getLatestRelease.ts",
    "./src/parser/isUnreleasedVersion.ts",
    "./src/types/index.ts",
  ],
  format: ["cjs", "esm"], // Build for commonJS and ESmodules
  dts: true, // Generate declaration file (.d.ts)
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
});
