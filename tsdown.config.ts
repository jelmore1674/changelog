import { defineConfig } from "tsdown";

export default defineConfig({
  entry: [
    "src/index.ts",
  ],
  format: ["esm"], // Build for commonJS and ESmodules
  clean: true,
  target: false,
  dts: {
    sourcemap: true,
  },
  fixedExtension: false,
});
