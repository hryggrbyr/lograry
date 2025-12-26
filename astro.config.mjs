import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig(({ command }) => ({
  output: "static",
  site: "https://hryggrbyr.github.io",
  base: command === "build" ? "/lograry/" : "/",
}));
