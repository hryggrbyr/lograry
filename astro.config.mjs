import { defineConfig } from "astro/config";

const isProd = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://hryggrbyr.github.io",
  base: isProd ? "/lograry/" : "/",
});
